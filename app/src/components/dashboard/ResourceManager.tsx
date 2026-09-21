import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { 
  Search, 
  Trash2, 
  UploadCloud,
  FileText,
  X
} from 'lucide-react';
import { toast } from 'sonner';

interface KnowledgeHubItem {
  id: string;
  title: string;
  description: string;
  category: string;
  media_type: 'video_embed' | 'document_url' | 'external_link';
  url: string;
  cover_image_url: string | null;
  author_name: string;
  created_at: string;
}

const Attachment = ({ file, onRemove, isUploading }: { file: File; onRemove: () => void; isUploading: boolean }) => {
  return (
    <div className="flex items-center gap-3 p-3 border border-border bg-card">
      <FileText className="size-4 text-primary" />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-sans font-medium text-foreground truncate">{file.name}</p>
        <p className="text-[10px] text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
      </div>
      {!isUploading && (
        <button type="button" onClick={onRemove} className="text-muted-foreground hover:text-destructive p-1 transition-colors">
          <Trash2 className="size-4" />
        </button>
      )}
    </div>
  );
};

export default function ResourceManager() {
    const [items, setItems] = useState<KnowledgeHubItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCat, setFilterCat] = useState('all');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [newHubItem, setNewHubItem] = useState<{
    title: string;
    description: string;
    category: string;
    media_type: 'video_embed' | 'document_url' | 'external_link';
    url: string;
    author_name: string;
  }>({
    title: '', description: '', category: 'tutorial', media_type: 'document_url', url: '', author_name: ''
  });

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('knowledge_hub')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setItems(data || []);
    } catch (err: any) {
      toast.error('Failed to fetch resources');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: KnowledgeHubItem) => {
    setEditingId(item.id);
    setNewHubItem({
      title: item.title,
      description: item.description,
      category: item.category,
      media_type: item.media_type,
      url: item.url,
      author_name: item.author_name
    });
    setCoverPreviewUrl(item.cover_image_url || '');
    setCoverFile(null);
    setSelectedFile(null);
    setIsFormOpen(true);
  };

  const resetForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setNewHubItem({
      title: '', description: '', category: 'tutorial', media_type: 'document_url', url: '', author_name: ''
    });
    setCoverFile(null);
    setCoverPreviewUrl('');
    setSelectedFile(null);
  };

  const handleDelete = async (id: string, coverUrl: string | null, docUrl: string | null) => {
    if (!confirm('Are you sure you want to delete this resource?')) return;
    try {
      const { error } = await supabase.from('knowledge_hub').delete().eq('id', id);
      if (error) throw error;

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

      toast.success('Resource Deleted');
      fetchItems();
    } catch (err: any) {
      toast.error('Delete Failed');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    const uploadedPaths: string[] = [];
    try {
      let finalUrl = newHubItem.url;
      let coverImageUrl: string | null = coverPreviewUrl && !coverFile ? coverPreviewUrl : null;

      if (coverFile) {
        const coverExt = coverFile.name.split('.').pop();
        const coverName = `covers/${Date.now()}-${crypto.randomUUID()}.${coverExt}`;
        const { error: coverUploadError } = await supabase.storage.from('resources').upload(coverName, coverFile);
        if (coverUploadError) throw coverUploadError;
        const { data: coverData } = supabase.storage.from('resources').getPublicUrl(coverName);
        coverImageUrl = coverData.publicUrl;
        uploadedPaths.push(coverName);
      }

      if (newHubItem.media_type === 'document_url' && selectedFile) {
        const fileExt = selectedFile.name.split('.').pop();
        const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExt}`;
        const fp = `uploads/${fileName}`;
        const { error: uploadError } = await supabase.storage.from('resources').upload(fp, selectedFile);
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

      if (editingId) {
        const { error } = await supabase.from('knowledge_hub').update(payload).eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('knowledge_hub').insert(payload);
        if (error) throw error;
      }

      toast.success(editingId ? 'Resource Updated' : 'Resource Published');
      resetForm();
      fetchItems();
    } catch (err: any) {
      if (uploadedPaths.length > 0) {
        supabase.storage.from('resources').remove(uploadedPaths).catch(console.error);
      }
      toast.error('Save Failed', { description: err.message || err.toString() });
    } finally {
      setIsUploading(false);
    }
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = filterCat === 'all' || item.category === filterCat;
    return matchesSearch && matchesCat;
  });

  if (isFormOpen) {
    return (
      <div className="animate-in fade-in duration-300">
        <div className="page-head">
          <h1>{editingId ? 'Edit Resource' : 'Publish Resource'}</h1>
          <span className="sub">{'Add a new resource to the knowledge hub'}</span>
          <div className="act">
            <button className="btn btn-g" onClick={resetForm}><X className="size-4" /> Cancel</button>
          </div>
        </div>

        <form onSubmit={handleSave} className="card card-pad measure w-full" style={{ paddingBottom: '32px' }}>
          <div className="field">
            <label>Visual Identity</label>
            {coverPreviewUrl ? (
              <div className="relative aspect-video w-full max-w-md border border-border overflow-hidden bg-muted group">
                <img src={coverPreviewUrl} alt="Cover preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => { setCoverFile(null); setCoverPreviewUrl(''); }}
                  className="absolute top-2 right-2 p-1.5 bg-background/80 hover:bg-destructive hover:text-destructive-foreground transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => document.getElementById('cover-file-input')?.click()}
                className="drop-tile w-full max-w-md"
              >
                <UploadCloud />
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'oklch(var(--foreground))' }}>Upload Cover Image (16:9)</span>
                <span>Recommended: 1200x675px — JPEG, PNG, WEBP</span>
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="field">
              <label>{'Title'}</label>
              <input type="text" className="input" required value={newHubItem.title} onChange={e => setNewHubItem(p => ({ ...p, title: e.target.value }))} placeholder="Technical Introduction..." />
            </div>
            <div className="field">
              <label>{'Author Name'}</label>
              <input type="text" className="input" required value={newHubItem.author_name} onChange={e => setNewHubItem(p => ({ ...p, author_name: e.target.value }))} placeholder="e.g., Roshan Khumukcham" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="field">
              <label>{'Category'}</label>
              <select className="input" value={newHubItem.category} onChange={e => setNewHubItem(p => ({ ...p, category: e.target.value }))}>
                <option value="tutorial">{'Tutorial'}</option>
                <option value="podcast">{'Podcast'}</option>
                <option value="webinar">{'Webinar'}</option>
                <option value="study_material">{'Study Material'}</option>
              </select>
            </div>
            <div className="field">
              <label>{'Media Type'}</label>
              <select className="input" value={newHubItem.media_type} onChange={e => setNewHubItem(p => ({ ...p, media_type: e.target.value as any }))}>
                <option value="video_embed">{'Video Link'}</option>
                <option value="document_url">{'PDF Document'}</option>
                <option value="external_link">{'External Link'}</option>
              </select>
            </div>
          </div>

          {newHubItem.media_type === 'document_url' ? (
            <div className="field">
              <label>Document File Node</label>
              {!selectedFile && !newHubItem.url ? (
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                  required={!editingId}
                  onChange={e => {
                    if (e.target.files && e.target.files[0]) {
                      setSelectedFile(e.target.files[0]);
                    }
                  }}
                  className="input" style={{ paddingTop: '8px' }}
                />
              ) : selectedFile ? (
                <Attachment file={selectedFile} onRemove={() => setSelectedFile(null)} isUploading={isUploading} />
              ) : (
                <div className="flex items-center gap-3 p-3 border border-border bg-card">
                  <FileText className="size-4 text-primary" />
                  <span className="text-xs font-sans flex-1 truncate">{newHubItem.url.split('/').pop()}</span>
                  <button type="button" className="btn btn-g btn-sm" onClick={() => setNewHubItem({ ...newHubItem, url: '' })}>Replace</button>
                </div>
              )}
            </div>
          ) : (
            <div className="field">
              <label>{'Resource URL'}</label>
              <input type="url" className="input" required value={newHubItem.url} onChange={e => setNewHubItem(p => ({ ...p, url: e.target.value }))} placeholder="https://..." />
            </div>
          )}

          <div className="field">
            <label>{'Brief Description'}</label>
            <textarea className="input" value={newHubItem.description} onChange={e => setNewHubItem(p => ({ ...p, description: e.target.value }))} placeholder="A concise synopsis..." rows={3} />
          </div>

          <div style={{ marginTop: '24px' }}>
            <button type="submit" className="btn btn-p" disabled={isUploading}>
              {isUploading ? 'Saving...' : (editingId ? 'Update Resource' : 'Publish Resource')}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-7 animate-in fade-in duration-300 w-full">
      <div className="page-head">
        <h1>Library</h1>
        <span className="sub">Knowledge Hub resources</span>
        <div className="act">
          <span className="count-chip">{filteredItems.length} items</span>
          <button className="btn btn-p" onClick={() => setIsFormOpen(true)}>+ Add resource</button>
        </div>
      </div>

      <div className="toolbar">
        <div className="search">
          <Search />
          <input 
            type="text" 
            className="input" 
            placeholder="Search resources…" 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="seg">
          <button className={filterCat === 'all' ? 'on' : ''} onClick={() => setFilterCat('all')}>All files</button>
          <button className={filterCat === 'tutorial' ? 'on' : ''} onClick={() => setFilterCat('tutorial')}>Tutorials</button>
          <button className={filterCat === 'podcast' ? 'on' : ''} onClick={() => setFilterCat('podcast')}>Podcasts</button>
          <button className={filterCat === 'webinar' ? 'on' : ''} onClick={() => setFilterCat('webinar')}>Webinars</button>
          <button className={filterCat === 'study_material' ? 'on' : ''} onClick={() => setFilterCat('study_material')}>Study Material</button>
        </div>
      </div>

      {loading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: 'oklch(var(--muted-foreground))' }}>Loading resources...</div>
      ) : filteredItems.length === 0 ? (
        <div style={{ padding: '40px', textAlign: 'center', color: 'oklch(var(--muted-foreground))', border: '1px solid oklch(var(--border))' }}>No resources found.</div>
      ) : (
        <div className="mgrid">
          {filteredItems.map(item => (
            <div key={item.id} className="card asset">
              <div className="th" style={{ background: item.cover_image_url ? 'transparent' : 'var(--card)' }}>
                {item.cover_image_url ? (
                  <img src={item.cover_image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <FileText style={{ width: '32px', height: '32px', stroke: 'oklch(var(--muted-foreground))' }} />
                )}
              </div>
              <div className="bd">
                <div className="fn truncate" title={item.title}>{item.title}</div>
                <div className="fm">
                  {item.category.toUpperCase().replace('_', ' ')} • {item.media_type === 'video_embed' ? 'Video' : item.media_type === 'document_url' ? 'Doc' : 'Link'}
                </div>
              </div>
              <div className="ac">
                <button className="btn btn-q" onClick={() => handleEdit(item)}>Edit</button>
                <button className="btn btn-q" style={{ color: 'oklch(var(--destructive))' }} onClick={() => handleDelete(item.id, item.cover_image_url, item.media_type === 'document_url' ? item.url : null)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
