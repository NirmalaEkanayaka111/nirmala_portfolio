<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- Portfolio content lives only in src/data/portfolio.ts; sections are in src/components and use GSAP ScrollTrigger + Lenis, Three.js robot is created inside useEffect so SSR never touches WebGL.
- Hero styling is scoped under hero/nav classes in src/styles.css and interactions use the shared Button; keep reduced-motion and fine-pointer guards so motion stays accessible and touch-friendly.
- Keep the transition portrait as a separate profile asset from the shared portrait so transition-only changes cannot alter Hero or About imagery.
