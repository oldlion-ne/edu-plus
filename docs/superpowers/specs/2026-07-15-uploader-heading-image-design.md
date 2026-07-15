# Design Spec: Dashboard Content Uploader Cover Image

Allow content creators (educators, admins, resource persons) to upload a banner/heading cover image when publishing educational resources, giving them a rich blog/news visual format.

## Database Integration
The `knowledge_hub` table has been migrated with a new column:
- `cover_image_url`: `TEXT` nullable (default `NULL`).

## UI/UX Enhancements
We will implement **Option A (Top Banner Layout)**:
1. **File Input Component:** A drag-and-drop cover image input zone at the top of the form.
2. **Preview Mode:** Show a styled, straight-edged 16:9 preview of the uploaded image inside the uploader form.
3. **Nordic Aesthetics:** Clean thin borders (`border-border`), uppercase tracking labels, straight lines only (`rounded-none`).
4. **State variables:** Add `coverFile: File | null` and `coverPreviewUrl: string` to manage the lifecycle of the selected image.

## Upload Flow
When submitting the form:
1. If a cover image is selected:
   - Upload it to the `resources` Supabase bucket path: `uploads/covers/${Date.now()}-${random}.[ext]`
   - Retrieve its public URL and assign it to `cover_image_url`.
2. Insert both the main resource URL/file and the `cover_image_url` into the `knowledge_hub` table.
