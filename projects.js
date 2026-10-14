// Replace the video and release URLs with the final hosted reel and published work.
// Keep muted: browsers only allow reliable autoplay when a video starts muted.
export const projects = [
  {
    number: "01",
    discipline: "cinematic",
    title: "PUBG : Dednet\nTrailer",
    category: "CINEMATIC · TRAILER",
    year: "2026",
    role: "Environment Art · Rendering · FX · Technical Art",
    tools: "UNREAL ENGINE 5 · SUBSTANCE PAINTER · MAYA",
    toolLogos: [
      { name: "Unreal Engine 5", src: "./assets/tools/unreal-engine.png" },
      { name: "Substance Painter", src: "./assets/tools/substance-painter.png" },
      { name: "Maya", src: "./assets/tools/maya.png" }
    ],
    description: "시네마틱 연출과 샷 흐름에 맞춰 환경을 디벨롭하고, 블러드 FX가 장면 안에서 선명하게 읽히도록 관련 모델링과 표현을 다듬었습니다. 환경 제작부터 FX와 렌더링까지 연결해 컷의 완성도를 높였습니다.",
    video: "./media/dednet.mp4",
    releaseUrl: "https://www.youtube.com/watch?v=ED_kgsr8MkU",
    poster: ""
  },
  {
    number: "02",
    discipline: "cinematic",
    title: "Erangel Subzero\nLore Film",
    category: "CINEMATIC · LORE FILM",
    year: "2025",
    role: "Environment Art · Rendering · FX · Technical Art",
    tools: "UNREAL ENGINE 5 · MAYA",
    toolLogos: [
      { name: "Unreal Engine", src: "./assets/tools/unreal-engine.png" },
      { name: "Maya", src: "./assets/tools/maya.png" }
    ],
    description: "시네마틱에 맞춰 환경을 구성하고, 얼어붙은 블루존 머티리얼과 월드가 점진적으로 얼어가는 프리즈 효과를 제작했습니다. 환경의 변화가 서사와 함께 읽히도록 머티리얼 연출과 렌더링을 다듬었습니다.",
    video: "./media/subzero.mp4",
    releaseUrl: "https://www.youtube.com/watch?v=eFRcy0Bcqtc",
    poster: ""
  },
  {
    number: "03",
    discipline: "cinematic",
    title: "PUBG : Blendspot\nGamescom 2025\nCinematic",
    category: "CINEMATIC · GAMESCOM 2025",
    year: "2025",
    role: "Environment Art · Rendering · FX · Technical Art",
    tools: "UNREAL ENGINE 5 · HOUDINI · MAYA",
    toolLogos: [
      { name: "Unreal Engine 5", src: "./assets/tools/unreal-engine.png" },
      { name: "Houdini", src: "./assets/tools/houdini.png" },
      { name: "Maya", src: "./assets/tools/maya.png" }
    ],
    description: "시네마틱의 샷 구성에 맞춰 환경을 디벨롭하고, 주변 풍경을 반사하는 방독면 고글 머티리얼을 제작했습니다. 문 파괴 연출과 샷별 연기 세팅으로 액션의 흐름과 공간감을 보강했습니다.",
    video: "./media/blendspot.mp4",
    releaseUrl: "https://www.youtube.com/watch?v=m1Gi5ABxO4I",
    poster: ""
  },
  {
    number: "04",
    discipline: "cinematic",
    title: "DinkumTogether\nCinematic",
    category: "CINEMATIC · CHARACTER & WORLD",
    year: "2024",
    role: "Environment Art · Rigging · Render Layers · Compositing · Technical Art",
    tools: "MAYA · HOUDINI · DAVINCI RESOLVE",
    toolLogos: [
      { name: "Maya", src: "./assets/tools/maya.png" },
      { name: "Houdini", src: "./assets/tools/houdini.png" }
    ],
    description: "후디니 프로시저럴 워크플로로 월드와 환경을 구축하고, 자체 제작한 페이셜 리그 툴로 메인 캐릭터의 얼굴 리깅을 진행했습니다. Redshift 오프라인 렌더 파이프라인의 Render Layer와 AOV를 구성하고, 컴포지팅 셋업까지 연결했습니다.",
    video: "./media/dinkum-together.mp4",
    releaseUrl: "https://www.youtube.com/watch?v=h7cVuFXVYVI",
    poster: ""
  }
];
