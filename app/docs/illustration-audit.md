# EduPlus Illustration Audit

Audit date: 2026-07-13

## Art-direction contract

All route imagery must use ultra-clean minimalist modern flat illustration, angular simplified geometry, matte gradient cel shading, candlelight amber side light, cool charcoal shadows, and an uncluttered background. Human scenes must depict East Asian people only. Photography, photorealistic rendering, harsh outlines, text, logos, and watermarks are prohibited.

## Results

| Route | Asset | Dimensions | Human representation | Flat/non-realistic style | Artifacts and text | Crop safety | Result |
|---|---|---:|---|---|---|---|---|
| Home | `HomeHeroVisual.webp` | 1536×1024 | Four clearly East Asian adults | Pass | Pass | Pass at split and offset crops | Pass |
| About | `AboutCollabVisual.webp` | 1254×1254 | Three clearly East Asian adults | Pass | Pass | Pass at poster crop | Pass |
| Programs | `CurriculumVisual.webp` | 1927×816 | No people depicted | Pass | Pass | Pass at offset crop | Pass |
| Knowledge Hub | `HubVisual.webp` | 1536×1024 | No people depicted | Pass | Pass | Pass at split crop | Pass |
| Events | `EventsVisual.webp` | 1536×1024 | Three clearly East Asian adults | Pass | Pass | Pass at offset crop | Pass |
| Council | `CouncilVisual.webp` | 1610×977 | Five clearly East Asian adults | Pass | Pass | Pass at split crop | Pass |
| Guidance | `MentorshipVisual.webp` | 1536×1024 | Two clearly East Asian adults | Pass | Pass | Pass at poster crop | Pass |
| News | `NewsVisual.webp` | 1536×1024 | No people depicted | Pass | Pass | Pass at poster crop | Pass |
| Contact | `ContactVisual.webp` | 1536×1024 | No people depicted | Pass | Pass | Pass at split crop | Pass |

## Decision

No scene requires regeneration. The current set was created for the platform hardening program under the same East Asian-only and flat-vector constraints and remains internally consistent. Replacing a passing scene would add visual drift without addressing a defect.

The approved generation prompt for any future replacement is:

> Use case: stylized-concept. Asset type: EduPlus route hero illustration. Ultra-clean minimalist modern flat vector illustration; East Asian people only when people are depicted; angular simplified anatomy; straight-edged environmental geometry; matte gradient cel shading; warm candlelight amber side rim light; cool charcoal volumetric shadows; uncluttered solid background; no harsh outline; no photo texture; no realism; no text; no logo; no watermark. Compose for the named route and preserve safe subject placement for responsive split, offset, or poster crops.

Future generation uses the built-in image generation mode and must be visually inspected before it is copied into `public/images`.
