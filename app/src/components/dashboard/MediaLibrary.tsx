import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Input } from '@/components/ui/input';
import { 
  FileImage, 
  UploadCloud, 
  Trash2, 
  Copy, 
  Check, 
  FileText, 
  ExternalLink,
  Search
} from 'lucide-react';
import { toast } from 'sonner';

interface MediaItem {
  name: string;
  id?: string | null;
  updated_at?: string | null;
  created_at?: string | null;
  last_accessed_at?: string | null;
  metadata?: Record<string, any> | null;
  publicUrl: string;
}

export default function MediaLibrary() {
  const [files, setFiles] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetchMediaFiles();
  }, []);

  const fetchMediaFiles = async () => {
    setLoading(true);
    try {
      // Ensure avatars or cms bucket exists
      const { data, error } = await supabase.storage.from('avatars').list('', {
        limit: 100,
        sortBy: { column: 'created_at', order: 'desc' }
      });

      if (error) throw error;

      const mediaList: MediaItem[] = (data || []).map((file: any) => {
        const { data: pubData } = supabase.storage.from('avatars').getPublicUrl(file.name);
        return {
          ...file,
          publicUrl: pubData.publicUrl
        };
      });

      setFiles(mediaList);
    } catch (err: any) {
      toast.error(err.message || 'Failed to fetch media assets');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    setIsUploading(true);
    try {
      const fileExt = uploadedFile.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error } = await supabase.storage.from('avatars').upload(filePath, uploadedFile);
      if (error) throw error;

      toast.success('File uploaded successfully');
      fetchMediaFiles();
    } catch (err: any) {
      toast.error(err.message || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteFile = async (fileName: string) => {
    if (!confirm(`Delete ${fileName}?`)) return;
    try {
      const { error } = await supabase.storage.from('avatars').remove([fileName]);
      if (error) throw error;
      toast.success('Asset deleted');
      setFiles(prev => prev.filter((f: MediaItem) => f.name !== fileName));
    } catch (err: any) {
      toast.error(err.message || 'Delete failed');
    }
  };

  const copyUrlToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast.success('Public URL copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredFiles = files.filter((f: MediaItem) => f.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 text-left font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h2 className="font-heading text-2xl font-light text-foreground flex items-center gap-2">
            <FileImage className="size-5 text-primary" />
            Media & Asset Library
          </h2>
          <p className="font-sans text-xs text-muted-foreground mt-1">
            Central repository for images, avatars, documents, and media used across your frontend and CMS.
          </p>
        </div>

        <label className="cursor-pointer inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-xs font-medium rounded-none hover:bg-primary/90 transition-colors">
          <UploadCloud className="size-4" />
          {isUploading ? 'Uploading...' : 'Upload Media Asset'}
          <input type="file" onChange={handleFileUpload} disabled={isUploading} className="hidden" />
        </label>
      </div>

      {/* Filter */}
      <div className="relative w-full sm:w-80">
        <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
        <Input 
          type="text" 
          placeholder="Search assets by filename..."
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          className="pl-9 bg-background border-border rounded-none text-xs focus:ring-0"
        />
      </div>

      {/* Asset Grid */}
      {loading ? (
        <div className="p-12 text-center text-muted-foreground text-xs border border-border bg-card">
          Fetching media storage bucket...
        </div>
      ) : filteredFiles.length === 0 ? (
        <div className="p-12 text-center border border-border bg-card space-y-3">
          <FileImage className="size-8 text-muted-foreground/40 mx-auto" />
          <p className="text-xs text-muted-foreground">No media assets found in storage.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredFiles.map((file: MediaItem) => {
            const isImage = file.name.match(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/i);
            return (
              <div key={file.id || file.name} className="border border-border bg-card rounded-none overflow-hidden group hover:border-foreground/40 transition-colors flex flex-col justify-between">
                <div className="h-32 bg-muted/20 flex items-center justify-center p-2 relative overflow-hidden">
                  {isImage ? (
                    <img src={file.publicUrl} alt={file.name} className="h-full w-full object-cover" />
                  ) : (
                    <FileText className="size-8 text-muted-foreground" />
                  )}
                  <a 
                    href={file.publicUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="absolute top-2 right-2 bg-background/80 p-1 text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Open full size"
                  >
                    <ExternalLink className="size-3.5" />
                  </a>
                </div>

                <div className="p-2.5 space-y-2 border-t border-border/40">
                  <p className="font-mono text-[10px] truncate text-foreground" title={file.name}>
                    {file.name}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => copyUrlToClipboard(file.publicUrl, file.id || file.name)}
                      className="text-[10px] text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                    >
                      {copiedId === (file.id || file.name) ? <Check className="size-3 text-primary" /> : <Copy className="size-3" />}
                      {copiedId === (file.id || file.name) ? 'Copied' : 'Copy URL'}
                    </button>

                    <button
                      onClick={() => handleDeleteFile(file.name)}
                      className="text-[10px] text-muted-foreground hover:text-destructive transition-colors p-1"
                      title="Delete Asset"
                    >
                      <Trash2 className="size-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
