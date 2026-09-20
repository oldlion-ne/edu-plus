import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { 
  UploadCloud, 
  Trash2, 
  Copy, 
  FileText, 
  MoreHorizontal,
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
  const [filterType, setFilterType] = useState('all');
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  useEffect(() => {
    fetchMediaFiles();
    
    const closeMenu = (e: MouseEvent) => {
      if (!(e.target as Element).closest('.menu-wrap')) {
        setMenuOpenId(null);
      }
    };
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, []);

  const fetchMediaFiles = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.storage.from('avatars').list('', {
        limit: 100,
        sortBy: { column: 'created_at', order: 'desc' }
      });
      if (error) throw error;
      const mediaList: MediaItem[] = (data || []).map((file: any) => {
        const { data: pubData } = supabase.storage.from('avatars').getPublicUrl(file.name);
        return { ...file, publicUrl: pubData.publicUrl };
      });
      setFiles(mediaList);
    } catch (err: any) {
      toast.error('Failed to fetch media assets');
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
      const { error } = await supabase.storage.from('avatars').upload(fileName, uploadedFile);
      if (error) throw error;
      toast.success('File uploaded successfully');
      fetchMediaFiles();
    } catch (err: any) {
      toast.error('Upload failed');
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
      toast.error('Delete failed');
    }
  };

  const copyUrlToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast.success('URL copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredFiles = files.filter((f: MediaItem) => {
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase());
    const isImage = f.name.match(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/i);
    const matchesType = filterType === 'all' ? true : (filterType === 'images' ? isImage : !isImage);
    return matchesSearch && matchesType;
  });

  return (
    <div className="flex flex-col gap-7 animate-in fade-in duration-300 w-full">
      <div className="page-head">
        <h1>Media</h1>
        <span className="sub">Images, avatars, and documents used across the site</span>
        <div className="act">
          <label className="btn btn-p btn-sm cursor-pointer">
            <UploadCloud className="size-3.5 mr-1" />
            {isUploading ? 'Uploading...' : 'Upload asset'}
            <input type="file" onChange={handleFileUpload} disabled={isUploading} className="hidden" />
          </label>
        </div>
      </div>

      <div className="toolbar">
        <div className="search">
          <Search />
          <input 
            type="text" 
            className="input" 
            placeholder="Search by name…" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="seg">
          <button className={filterType === 'all' ? 'on' : ''} onClick={() => setFilterType('all')}>All</button>
          <button className={filterType === 'images' ? 'on' : ''} onClick={() => setFilterType('images')}>Images</button>
          <button className={filterType === 'documents' ? 'on' : ''} onClick={() => setFilterType('documents')}>Documents</button>
        </div>
      </div>

      {loading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: 'oklch(var(--muted-foreground))' }}>Loading media...</div>
      ) : (
        <div className="mgrid">
          <label className="drop-tile cursor-pointer">
            <UploadCloud className="size-[22px] stroke-current" />
            <span>Drop files anywhere, or browse…</span>
            <input type="file" onChange={handleFileUpload} disabled={isUploading} className="hidden" />
          </label>

          {filteredFiles.map((file: MediaItem) => {
            const isImage = file.name.match(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/i);
            const isMenuOpen = menuOpenId === file.name;
            const fileSize = file.metadata?.size ? `${(file.metadata.size / 1024).toFixed(0)} KB` : 'Unknown size';

            return (
              <div key={file.id || file.name} className="card asset">
                <div 
                  className="th" 
                  style={{ 
                    background: isImage ? `url('${file.publicUrl}') center/cover` : 'var(--card)',
                    display: isImage ? 'block' : 'grid',
                    placeItems: isImage ? 'none' : 'center'
                  }}
                >
                  {!isImage && <FileText style={{ width: '32px', height: '32px', stroke: 'oklch(var(--muted-foreground))' }} />}
                </div>
                <div className="bd">
                  <div className="fn truncate" title={file.name}>{file.name}</div>
                  <div className="fm">{fileSize}</div>
                </div>
                <div className="ac" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                  <button 
                    className="btn btn-q" 
                    style={{ padding: '0 4px', height: 'auto', background: 'transparent' }} 
                    onClick={() => copyUrlToClipboard(file.publicUrl, file.id || file.name)}
                  >
                    {copiedId === (file.id || file.name) ? 'Copied!' : 'Copy URL'}
                  </button>
                  
                  <div className="menu-wrap" onClick={e => e.stopPropagation()}>
                    <button 
                      className="icon-btn" 
                      onClick={() => setMenuOpenId(isMenuOpen ? null : file.name)}
                    >
                      <MoreHorizontal className="size-4" />
                    </button>
                    <div className={`menu ${isMenuOpen ? 'on' : ''}`}>
                      <button onClick={() => { copyUrlToClipboard(file.publicUrl, file.id || file.name); setMenuOpenId(null); }}>
                        <Copy className="size-3" /> Copy URL
                      </button>
                      <hr />
                      <button className="dng" onClick={() => { handleDeleteFile(file.name); setMenuOpenId(null); }}>
                        <Trash2 className="size-3" /> Delete
                      </button>
                    </div>
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
