/* Storyfun 1 · 拆书笔记
   极简静态路由：hash → content/*.md → marked → mermaid
*/
(function () {
  "use strict";

  var routes = {
    home:     { file: "home.md",     label: "首页" },
    map:      { file: "map.md",      label: "学习地图" },
    "unit-1": { file: "unit-1.md",   label: "Unit 1 · Counting" },
    "unit-2": { file: "unit-2.md",   label: "Unit 2 · Come and play" },
    "unit-3": { file: "unit-3.md",   label: "Unit 3 · Kim's birthday" },
    "unit-4": { file: "unit-4.md",   label: "Unit 4 · Hugo's school bag" },
    "unit-5": { file: "unit-5.md",   label: "Unit 5 · What am I?" },
    "unit-6": { file: "unit-6.md",   label: "Unit 6 · Grandma's glasses" },
    "unit-7": { file: "unit-7.md",   label: "Unit 7 · Let's go there now!" },
    "unit-8": { file: "unit-8.md",   label: "Unit 8 · Not today!" },
    guide:    { file: "guide.md",    label: "家长 / 老师指南" },
    sources:  { file: "sources.md",  label: "原书资料" }
  };

  var contentEl = document.getElementById("content");
  var crumbEl = document.getElementById("crumb");
  var navEl = document.getElementById("nav");
  var sidebarEl = document.getElementById("sidebar");
  var overlayEl = document.getElementById("overlay");
  var menuBtn = document.getElementById("menuBtn");
  var cache = {};

  /* ---------- 基础设置 ---------- */
  if (window.marked) {
    marked.setOptions({ gfm: true, breaks: false });
  }

  if (window.mermaid) {
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "loose",
      theme: "base",
      fontFamily: '"PingFang SC", "Microsoft YaHei", "Noto Sans SC", sans-serif',
      themeVariables: {
        primaryColor: "#e4f3ef",
        primaryTextColor: "#26353c",
        primaryBorderColor: "#0f766e",
        lineColor: "#8fa5a4",
        secondaryColor: "#fdeee8",
        tertiaryColor: "#fff6d9",
        clusterBkg: "#fffdf8",
        clusterBorder: "#e8dfd1",
        fontSize: "15px"
      },
      flowchart: {
        htmlLabels: true,
        curve: "basis",
        padding: 14,
        nodeSpacing: 34,
        rankSpacing: 42
      }
    });
  }

  function currentRoute() {
    var raw = (location.hash || "").replace(/^#\/?/, "").trim();
    return routes[raw] ? raw : "home";
  }

  function setActive(routeName) {
    var links = navEl.querySelectorAll("a[data-route]");
    for (var i = 0; i < links.length; i++) {
      links[i].classList.toggle("active", links[i].getAttribute("data-route") === routeName);
    }
    crumbEl.textContent = routes[routeName].label;
    document.title = routes[routeName].label + " · Storyfun 1 拆书笔记";
  }

  function closeMenu() {
    sidebarEl.classList.remove("open");
    overlayEl.hidden = true;
    menuBtn.setAttribute("aria-expanded", "false");
  }

  function openMenu() {
    sidebarEl.classList.add("open");
    overlayEl.hidden = false;
    menuBtn.setAttribute("aria-expanded", "true");
  }

  function loading() {
    contentEl.innerHTML =
      '<div class="loading"><div class="loading-dot"></div><p>正在打开拆书笔记…</p></div>';
  }

  function showError(message) {
    contentEl.innerHTML =
      '<div class="error-box">' +
      "<h2 style=\"margin-top:0;border:0;padding:0\">页面没有打开</h2>" +
      "<p>" + message + "</p>" +
      "<p>如果你是在本地双击 <code>index.html</code> 打开的，浏览器会拦截 Markdown 文件的读取。请在本目录运行一个本地服务器，例如：</p>" +
      "<pre><code>python -m http.server 8000</code></pre>" +
      "<p>然后访问 <code>http://localhost:8000</code>。</p>" +
      "</div>";
  }

  /* ---------- 渲染 Markdown ---------- */
  async function renderMarkdown(routeName) {
    var route = routes[routeName];
    loading();

    try {
      var md = cache[routeName];
      if (!md) {
        var res = await fetch("content/" + route.file, { cache: "no-cache" });
        if (!res.ok) throw new Error("HTTP " + res.status);
        md = await res.text();
        cache[routeName] = md;
      }

      contentEl.innerHTML = marked.parse(md);
      contentEl.classList.remove("is-ready");
      void contentEl.offsetWidth;
      contentEl.classList.add("is-ready");

      // 外部链接新窗口打开
      contentEl.querySelectorAll('a[href^="http"]').forEach(function (a) {
        a.target = "_blank";
        a.rel = "noopener";
      });

      // 图片懒加载
      contentEl.querySelectorAll("img").forEach(function (img) {
        img.loading = "lazy";
      });

      await renderMermaid(contentEl);
    } catch (err) {
      showError(err && err.message ? err.message : String(err));
    }
  }

  /* ---------- Mermaid ---------- */
  async function renderMermaid(container) {
    var codes = Array.prototype.slice.call(
      container.querySelectorAll("pre > code.language-mermaid")
    );

    codes.forEach(function (code) {
      var pre = code.closest("pre");
      if (!pre) return;
      var box = document.createElement("div");
      box.className = "mermaid";
      box.textContent = code.textContent;
      pre.replaceWith(box);
    });

    var nodes = Array.prototype.slice.call(container.querySelectorAll(".mermaid"));
    if (!nodes.length) return;

    if (!window.mermaid) {
      nodes.forEach(function (node) {
        node.classList.add("mermaid-error");
        node.textContent = "Mermaid 没有加载成功，请检查网络后刷新。";
      });
      return;
    }

    for (var i = 0; i < nodes.length; i++) {
      try {
        await mermaid.run({ nodes: [nodes[i]] });
      } catch (err) {
        nodes[i].classList.add("mermaid-error");
        nodes[i].textContent =
          "这张图暂时没有渲染成功。\n" + (err && err.message ? err.message : String(err));
      }
    }
  }

  /* ---------- 路由 ---------- */
  async function route() {
    var routeName = currentRoute();
    setActive(routeName);
    closeMenu();
    window.scrollTo({ top: 0, behavior: "auto" });
    await renderMarkdown(routeName);
  }

  /* ---------- 事件 ---------- */
  menuBtn.addEventListener("click", function () {
    if (sidebarEl.classList.contains("open")) closeMenu();
    else openMenu();
  });

  overlayEl.addEventListener("click", closeMenu);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  window.addEventListener("hashchange", route);

  // 首次进入
  if (!location.hash) {
    history.replaceState(null, "", "#/home");
  }
  route();
})();
