import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { useTranslation } from '../../i18n/useTranslation';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { UploadCloud, FileText, Video, Link, Trash2, Edit2, X } from 'lucide-react';
import { Attachment } from '../ui/attachment';

export function ResourceManager() {
  const { t } = useTranslation();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string>('');
  const [newHubItem, setNewHubItem] = useState({
    title: '',
    description: '',
    category: 'tutorial',
    media_type: 'video_embed',
    url: '',
    author_name: ''
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('knowledge_hub')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) {
      setItems(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    return () => {
      if (coverPreviewUrl && coverPreviewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(coverPreviewUrl);
      }
    };
  }, [coverPreviewUrl]);

  const resetForm = () => {
    setNewHubItem({
      title: '',
      description: '',
      category: 'tutorial',
      media_type: 'video_embed',
      url: '',
      author_name: ''
    });
    setSelectedFile(null);
    setCoverFile(null);
    setCoverPreviewUrl('');
    setEditingId(null);
    setIsFormOpen(false);
  };

  const handleEdit = (item: any) => {
    setNewHubItem({
      title: item.title,
      description: item.description || '',
      category: item.category,
      media_type: item.media_type,
      url: item.url,
      author_name: item.author_name || ''
    });
    setCoverPreviewUrl(item.cover_image_url || '');
    setEditingId(item.id);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string, coverUrl: string | null, docUrl: string | null) => {
    if (!window.confirm('Are you sure you want to delete this resource?')) return;
    
    try {
      // 1. Delete the record
      const { error } = await supabase.from('knowledge_hub').delete().eq('id', id);
      if (error) throw error;

      // 2. Cleanup storage optionally
      const pathsToDelete = [];
      if (coverUrl && coverUrl.includes('resources/covers/')) {
        const path = coverUrl.split('resources/')[1];
        if (path) pathsToDelete.push(path);
      }
      if (docUrl && docUrl.includes('resources/uploads/')) {
        const path = docUrl.split('resources/')[1];
        if (path) pathsToDelete.push(path);
      }

      if (pathsToDelete.length > 0) {
        await supabase.storage.from('resources').remove(pathsToDelete);
      }

      toast.success('Resource Deleted', {
        description: 'The resource has been removed.',
        style: { background: 'oklch(var(--card))', border: '1px solid oklch(var(--primary)/0.3)', color: 'oklch(var(--foreground))', borderRadius: '0px' }
      });
      fetchItems();
    } catch (err: any) {
      toast.error('Delete Failed', {
        description: err.message,
        style: { background: 'oklch(var(--card))', border: '1px solid oklch(var(--destructive)/0.3)', color: 'oklch(var(--foreground))', borderRadius: '0px' }
      });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    const uploadedPaths: string[] = [];
    try {
      let finalUrl = newHubItem.url;
      let coverImageUrl: string | null = coverPreviewUrl && !coverFile ? coverPreviewUrl : null;

      // Upload new cover image if provided
      if (coverFile) {
        const coverExt = coverFile.name.split('.').pop();
        const coverName = `covers/${Date.now()}-${Math.random().toString(36).slice(2)}.${coverExt}`;
        const { error: coverUploadError } = await supabase.storage
          .from('resources')
          .upload(coverName, coverFile);
        if (coverUploadError) throw coverUploadError;
        const { data: coverData } = supabase.storage.from('resources').getPublicUrl(coverName);
        coverImageUrl = coverData.publicUrl;
        uploadedPaths.push(coverName);
      }

      // Upload new document file if document_url type and a file was selected
      if (newHubItem.media_type === 'document_url' && selectedFile) {
        const fileExt = selectedFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
        const fp = `uploads/${fileName}`;
        const { error: uploadError } = await supabase.storage
          .from('resources')
          .upload(fp, selectedFile);
        if (uploadError) throw uploadError;
        const { data } = supabase.storage.from('resources').getPublicUrl(fp);
        finalUrl = data.publicUrl;
        uploadedPaths.push(fp);
      } else if (newHubItem.media_type === 'document_url' && !selectedFile && !editingId) {
        throw new Error('Please select a document file to upload.');
      }

      const payload = {
        title: newHubItem.title,
        description: newHubItem.description,
        category: newHubItem.category,
        media_type: newHubItem.media_type,
        url: finalUrl,
        cover_image_url: coverImageUrl,
        author_name: newHubItem.author_name || 'Staff Advisor'
      };

      let saveError;
      if (editingId) {
        const { error } = await supabase.from('knowledge_hub').update(payload).eq('id', editingId);
        saveError = error;
      } else {
        const { error } = await supabase.from('knowledge_hub').insert(payload);
        saveError = error;
      }

      if (saveError) throw saveError;

      toast.success(editingId ? 'Resource Updated' : 'Resource Published', {
        description: 'Knowledge node has been updated in the database.',
        style: { background: 'oklch(var(--card))', border: '1px solid oklch(var(--primary)/0.3)', color: 'oklch(var(--foreground))', borderRadius: '0px' }
      });

      resetForm();
      fetchItems();
    } catch (err: any) {
      console.error('Content Save Error:', err);
      if (uploadedPaths.length > 0) {
        supabase.storage.from('resources').remove(uploadedPaths).catch(console.error);
      }
      
      const errorMessage = err?.message || err?.toString() || 'An unexpected error occurred.';
      toast.error('Save Failed', {
        description: errorMessage,
        style: { background: 'oklch(var(--card))', border: '1px solid oklch(var(--destructive)/0.3)', color: 'oklch(var(--foreground))', borderRadius: '0px' }
      });
    } finally {
      setIsUploading(false);
    }
  };

  if (isFormOpen) {
    return (
      <div className="space-y-6 animate-in fade-in duration-300 text-left">
        <div className="flex justify-between items-center border-b border-border pb-4">
          <div>
            <h2 className="font-heading text-2xl font-light text-foreground">{editingId ? 'Edit Resource' : t('dashboard.uploader.heading')}</h2>
            <p className="font-mono text-xs text-muted-foreground mt-1">{t('dashboard.uploader.subheading')}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={resetForm} className="rounded-none">
            <X className="size-4 mr-2" /> Cancel
          </Button>
        </div>

        <form onSubmit={handleSave} className="space-y-8 max-w-4xl border border-border p-8 bg-card rounded-none shadow-sm">
          <div className="space-y-2">
            <Label className="text-[10px] font-sans font-semibold text-muted-foreground uppercase tracking-wider block">Visual Identity</Label>
            {coverPreviewUrl ? (
              <div className="relative aspect-video w-full max-w-md border border-border overflow-hidden bg-muted group">
                <img src={coverPreviewUrl} alt="Cover preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => {
                    setCoverFile(null);
                    setCoverPreviewUrl('');
                  }}
                  className="absolute top-2 right-2 p-1.5 bg-background/80 hover:bg-destructive hover:text-destructive-foreground transition-colors rounded-none"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => document.getElementById('cover-file-input')?.click()}
                className="w-full max-w-md aspect-video border-2 border-dashed border-border hover:border-primary/50 transition-colors flex flex-col items-center justify-center bg-card hover:bg-primary/5 rounded-none group cursor-pointer"
              >
                <UploadCloud className="size-7 text-muted-foreground/50" />
                <span className="font-sans text-sm text-foreground font-medium mt-1">Upload Cover Image (16:9)</span>
                <span className="text-xs text-muted-foreground">Recommended: 1200x675px — JPEG, PNG, WEBP</span>
                <input
                  id="cover-file-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
                      setCoverFile(file);
                      if (coverPreviewUrl && coverPreviewUrl.startsWith('blob:')) URL.revokeObjectURL(coverPreviewUrl);
                      setCoverPreviewUrl(URL.createObjectURL(file));
                    }
                  }}
                />
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label className="text-[10px] font-sans font-semibold text-muted-foreground uppercase tracking-wider block">{t('dashboard.uploader.title')}</Label>
              <Input
                type="text"
                required
                value={newHubItem.title}
                onChange={e => setNewHubItem(p => ({ ...p, title: e.target.value }))}
                placeholder="Technical Introduction to React 19..."
                className="w-full bg-background border border-border text-xs px-4 py-2.5 outline-none focus:border-primary rounded-none text-foreground font-sans h-9"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-sans font-semibold text-muted-foreground uppercase tracking-wider block">{t('dashboard.uploader.authorName')}</Label>
              <Input
                type="text"
                required
                value={newHubItem.author_name}
                onChange={e => setNewHubItem(p => ({ ...p, author_name: e.target.value }))}
                placeholder="e.g., Roshan Khumukcham"
                className="w-full bg-background border border-border text-xs px-4 py-2.5 outline-none focus:border-primary rounded-none text-foreground font-sans h-9"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-2 flex flex-col gap-1.5">
              <Label className="text-[10px] font-sans font-semibold text-muted-foreground uppercase tracking-wider block">{t('dashboard.uploader.category')}</Label>
              <Select
                value={newHubItem.category}
                onValueChange={val => setNewHubItem(p => ({ ...p, category: val }))}
              >
                <SelectTrigger className="w-full bg-background border border-border text-xs px-4 py-2.5 outline-none focus:border-primary rounded-none text-foreground font-sans h-9">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="rounded-none bg-card border border-border text-foreground font-sans text-xs z-50">
                  <SelectItem value="tutorial" className="rounded-none cursor-pointer">{t('dashboard.uploader.tutorial')}</SelectItem>
                  <SelectItem value="podcast" className="rounded-none cursor-pointer">{t('dashboard.uploader.podcast')}</SelectItem>
                  <SelectItem value="webinar" className="rounded-none cursor-pointer">{t('dashboard.uploader.webinar')}</SelectItem>
                  <SelectItem value="study_material" className="rounded-none cursor-pointer">{t('dashboard.uploader.studyMaterial')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 flex flex-col gap-1.5">
              <Label className="text-[10px] font-sans font-semibold text-muted-foreground uppercase tracking-wider block">{t('dashboard.uploader.mediaType')}</Label>
              <Select
                value={newHubItem.media_type}
                onValueChange={val => setNewHubItem(p => ({ ...p, media_type: val }))}
              >
                <SelectTrigger className="w-full bg-background border border-border text-xs px-4 py-2.5 outline-none focus:border-primary rounded-none text-foreground font-sans h-9">
                  <SelectValue placeholder="Select Media Type" />
                </SelectTrigger>
                <SelectContent className="rounded-none bg-card border border-border text-foreground font-sans text-xs z-50">
                   <SelectItem value="video_embed" className="rounded-none cursor-pointer">{t('dashboard.uploader.videoLink')}</SelectItem>
                   <SelectItem value="document_url" className="rounded-none cursor-pointer">{t('dashboard.uploader.pdfLink')}</SelectItem>
                   <SelectItem value="external_link" className="rounded-none cursor-pointer">{t('dashboard.uploader.externalLink')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {newHubItem.media_type === 'document_url' ? (
            <div className="space-y-2">
              <Label className="text-[10px] font-sans font-semibold text-muted-foreground uppercase tracking-wider block">Document File Node</Label>
              {!selectedFile && !newHubItem.url ? (
                <div className="relative">
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                    required={!editingId}
                    onChange={e => {
                      if (e.target.files && e.target.files[0]) {
                        setSelectedFile(e.target.files[0]);
                      }
                    }}
                    className="w-full bg-background border border-border text-xs px-4 py-1.5 outline-none focus:border-primary rounded-none text-foreground font-sans h-9 file:mr-4 file:py-1 file:px-2 file:rounded-none file:border-0 file:text-[10px] file:font-sans file:bg-primary file:text-primary-foreground hover:file:bg-foreground hover:file:text-background cursor-pointer"
                  />
                </div>
              ) : selectedFile ? (
                <Attachment 
                  file={selectedFile} 
                  onRemove={() => setSelectedFile(null)} 
                  isUploading={isUploading}
                />
              ) : (
                <div className="flex items-center gap-3 p-3 border border-border bg-card">
                  <FileText className="size-4 text-primary" />
                  <span className="text-xs font-sans flex-1 truncate">{newHubItem.url.split('/').pop()}</span>
                  <Button variant="ghost" size="sm" onClick={() => setNewHubItem({ ...newHubItem, url: '' })} className="h-6 px-2 text-[10px]">
                    Replace
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <Label className="text-[10px] font-sans font-semibold text-muted-foreground uppercase tracking-wider block">{t('dashboard.uploader.resourceUrl')}</Label>
              <Input
                type="url"
                required
                value={newHubItem.url}
                onChange={e => setNewHubItem(p => ({ ...p, url: e.target.value }))}
                placeholder={newHubItem.media_type === 'video_embed' ? "https://www.youtube.com/watch?v=..." : "https://example.com/..."}
                className="w-full bg-background border border-border text-xs px-4 py-2.5 outline-none focus:border-primary rounded-none text-foreground font-sans h-9"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label className="text-[10px] font-sans font-semibold text-muted-foreground uppercase tracking-wider block">{t('dashboard.uploader.briefDescription')}</Label>
            <Textarea
              value={newHubItem.description}
              onChange={e => setNewHubItem(p => ({ ...p, description: e.target.value }))}
              placeholder="A concise synopsis detailing what core concepts this resource node will cover..."
              rows={3}
              className="w-full bg-background border border-border text-xs px-4 py-2 outline-none focus:border-primary rounded-none text-foreground font-sans resize-none min-h-20"
            />
          </div>

          <Button type="submit" disabled={isUploading} size="md" className="bg-primary text-primary-foreground hover:bg-foreground hover:text-background focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-300 font-sans text-sm font-medium cursor-pointer rounded-none disabled:opacity-50 disabled:cursor-not-allowed">
            {isUploading ? 'Saving...' : (editingId ? 'Update Resource' : 'Publish Resource')}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300 text-left">
      <div className="flex justify-between items-center border-b border-border pb-4">
        <div>
          <h2 className="font-heading text-2xl font-light text-foreground">Resource Manager</h2>
          <p className="font-sans text-xs text-muted-foreground mt-1">Manage and audit your Knowledge Hub library.</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="rounded-none bg-primary text-primary-foreground">
          + Add Resource
        </Button>
      </div>

      {loading ? (
        <div className="py-12 flex justify-center">
          <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest animate-pulse">Loading resources...</span>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 border border-border bg-card/30">
          <p className="font-sans text-xs text-muted-foreground">No resources found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map(item => (
            <Card key={item.id} className="border border-border bg-card/30 rounded-none p-4 flex flex-col justify-between group">
              <div className="flex gap-4">
                {item.cover_image_url ? (
                  <div className="w-24 h-16 shrink-0 bg-muted overflow-hidden border border-border">
                    <img src={item.cover_image_url} alt="" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-24 h-16 shrink-0 bg-muted flex items-center justify-center border border-border">
                    <FileText className="size-6 text-muted-foreground/50" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-sans text-sm font-medium text-foreground truncate">{item.title}</h3>
                  </div>
                  <p className="font-sans text-xs text-muted-foreground truncate mt-1">{item.description}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-primary bg-primary/10 px-1.5 py-0.5">
                      {item.category}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                      {item.media_type === 'video_embed' && <Video className="size-3" />}
                      {item.media_type === 'document_url' && <FileText className="size-3" />}
                      {item.media_type === 'external_link' && <Link className="size-3" />}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-border flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="sm" onClick={() => handleEdit(item)} className="h-7 px-2 text-[10px] rounded-none">
                  <Edit2 className="size-3 mr-1.5" /> Edit
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id, item.cover_image_url, item.media_type === 'document_url' ? item.url : null)} className="h-7 px-2 text-[10px] rounded-none hover:text-destructive hover:bg-destructive/10">
                  <Trash2 className="size-3 mr-1.5" /> Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
