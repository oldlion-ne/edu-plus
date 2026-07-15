# Content Uploader Cover Image Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a visual cover/heading image upload option to the Content Upload Station, allowing users to publish resources with banner images like a blog or news post.

**Architecture:** Add state variables for the cover image file and its preview URL. Render a full-width drag-and-drop banner image input at the top of the uploader form. On submission, upload the cover image to Supabase Storage, retrieve the public URL, and insert it into the `cover_image_url` column of the `knowledge_hub` table.

**Tech Stack:** React, Tailwind CSS, Supabase Storage & Database.

---

## Task 1: Add Cover Image Form Input UI

**Files:**
- Modify: `src/pages/Dashboard.tsx`

- [ ] **Step 1: Declare state variables**
  Around line 260, add the state variables:
  ```typescript
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string>('');
  ```

- [ ] **Step 2: Add cleanup on unmount/success**
  Make sure to release any object URLs created for preview:
  ```typescript
  useEffect(() => {
    return () => {
      if (coverPreviewUrl) URL.revokeObjectURL(coverPreviewUrl);
    };
  }, [coverPreviewUrl]);
  ```

- [ ] **Step 3: Render the Banner Upload field**
  Insert the cover uploader JSX at the very top of the `<form onSubmit={handleCreateHubItem}>` block (around line 950):
  ```tsx
  {/* Cover Image Banner Uploader */}
  <div className="space-y-2">
    <Label className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block">Heading Cover Image</Label>
    {coverPreviewUrl ? (
      <div className="relative aspect-[16/9] w-full border border-border bg-card/30 overflow-hidden">
        <img src={coverPreviewUrl} alt="Cover Preview" className="w-full h-full object-cover" />
        <Button 
          type="button" 
          variant="destructive"
          onClick={() => {
            setCoverFile(null);
            setCoverPreviewUrl('');
          }}
          className="absolute top-2 right-2 px-2.5 py-1 text-[9px] font-mono rounded-none uppercase h-7 cursor-pointer"
        >
          Remove Cover
        </Button>
      </div>
    ) : (
      <div 
        onClick={() => document.getElementById('cover-file-input')?.click()}
        className="w-full aspect-[16/9] border border-dashed border-border hover:border-primary/50 bg-background/50 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 py-6"
      >
        <UploadCloud className="size-6 text-muted-foreground mb-2" />
        <span className="font-mono text-[9px] text-primary tracking-wider uppercase font-bold">Upload Cover Image (16:9)</span>
        <span className="text-[8px] text-muted-foreground mt-1">Recommended: 1200x675px (JPEG, PNG, WEBP)</span>
        <input 
          id="cover-file-input"
          type="file" 
          accept="image/*"
          className="hidden" 
          onChange={e => {
            if (e.target.files && e.target.files[0]) {
              const file = e.target.files[0];
              setCoverFile(file);
              setCoverPreviewUrl(URL.createObjectURL(file));
            }
          }}
        />
      </div>
    )}
  </div>
  ```

---

## Task 2: Implement Cover Upload Logic in Submission

**Files:**
- Modify: `src/pages/Dashboard.tsx`

- [ ] **Step 1: Update handleCreateHubItem function**
  Modify the handler (around line 346) to upload the cover file to Supabase:
  ```typescript
  let coverImageUrl = null;
  if (coverFile) {
    const fileExt = coverFile.name.split('.').pop();
    const fileName = `covers/${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
    const { error: uploadError } = await supabase.storage
      .from('resources')
      .upload(fileName, coverFile);
    if (uploadError) throw uploadError;
    const { data } = supabase.storage.from('resources').getPublicUrl(fileName);
    coverImageUrl = data.publicUrl;
  }
  ```

- [ ] **Step 2: Add cover_image_url to insert query**
  ```typescript
  const { error } = await supabase.from('knowledge_hub').insert({
    title: newHubItem.title,
    description: newHubItem.description,
    category: newHubItem.category,
    media_type: newHubItem.media_type,
    url: finalUrl,
    cover_image_url: coverImageUrl,
    author_name: newHubItem.author_name || 'Staff Advisor'
  });
  ```

- [ ] **Step 3: Reset cover state on successful submit**
  Inside the success block:
  ```typescript
  setCoverFile(null);
  setCoverPreviewUrl('');
  ```

---

## Task 3: Compile & Validate Types

**Files:**
- Command: `pnpm tsc -b`

- [ ] **Step 1: Run typecheck**
  Run: `pnpm tsc -b`
  Expected: Command completes successfully with no TypeScript errors.
