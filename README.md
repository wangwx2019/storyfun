# Storyfun 1–6

剑桥少儿英语 **Storyfun**（Second edition）教材的 Markdown 文本整理。

- 适用考试：Cambridge English: Young Learners (YLE)
- 当前进度：**Level 1 已完成**
- 文本来源：PDF 经 [MinerU](https://mineru.net/) 转换，图片为 MinerU CDN 外链

## 拆书网页

在线预览：**https://wangwx2019.github.io/storyfun/**

用 HTML + Markdown + Mermaid 做的极简拆书页，包含：

- 8 个单元的故事地图、词汇卡、句型卡、价值点和小任务
- 每个单元页末的 Home Fun 练习页 + 折叠答案，学完就能做
- 全书学习地图、Starters 题型对应、家长/老师指南
- 每个单元都能一键跳回原始 Markdown 对照

站点入口是 `index.html`，Markdown 放在 `content/`，样式和脚本在 `assets/`。本地预览：

```bash
python -m http.server 8123
```

然后打开 <http://localhost:8123>。

## 进度

| 级别 | 状态 | 说明 |
| --- | --- | --- |
| Storyfun 1 | ✅ 已整理 | Student's Book / Teacher's Book / Home Fun Booklet / Answers |
| Storyfun 2–6 | ⏳ 待补充 | 按 Level 1 的结构继续添加 |

## Storyfun 1

### 文件

| 文档 | 说明 | 文件 |
| --- | --- | --- |
| Student's Book | 学生用书（80 页） | [打开](MinerU_markdown_182_1-_Storyfun_1._Student's_book_Saxby_Karen_2017_-80p__2117270302067953664.md) |
| Teacher's Book | 教师用书（59 页） | [打开](MinerU_markdown_182_2-_Storyfun_1._Teacher's_Book_Saxby_Karen_2017_-59p__2117271774566453248.md) |
| Home Fun Booklet | 家庭练习册（32 页） | [打开](MinerU_markdown_182_4-_Home_Fun_Booklet_1_Owen_Melissa_2017_-32p__2117271120779317248.md) |
| Home Fun Booklet Answers | 家庭练习册答案（32 页） | [打开](MinerU_markdown_182_5-_Home_Fun_Booklet_1._Answers_Owen_Melissa_2017_-32p__2117271459733602304.md) |

### Student's Book 目录

| 单元 | 页码 |
| --- | --- |
| Counting | 4 |
| Come and play | 12 |
| Kim's birthday | 20 |
| Hugo's school bag | 28 |
| What am I? | 36 |
| Grandma's glasses | 44 |
| Let's go there now! | 52 |
| Not today! | 60 |
| Let's have fun! | 68 |
| Let's speak! | 72 |
| Let's say! | 74 |
| Wordlist | 76 |

### Teacher's Book 结构

| 部分 | 页码 |
| --- | --- |
| Introduction | 4 |
| Checklist for Cambridge English: Starters preparation | 12 |
| Map of the Student's Book | 13 |
| Unit guide (teacher's notes) | 14 |
| Photocopiable activities | 46 |
| Certificate | 57 |
| Song lyrics | 58 |
| List of flashcards | 60 |
| Audio track listing | 63 |

### Home Fun Booklet 目录

| 主题 | 页码 |
| --- | --- |
| Numbers | 4 |
| Toys | 6 |
| Family | 8 |
| School | 10 |
| Review | 12 |
| Animals | 14 |
| Home | 16 |
| Sports | 18 |
| Food | 20 |
| Review | 22 |
| Let's have fun! | 24 |
| Picture dictionary | 26 |

## 使用说明

- 在 GitHub 上直接点击文件即可阅读，图片会自动从 CDN 加载。
- 也可克隆到本地后使用任意 Markdown 阅读器打开：

  ```bash
  git clone https://github.com/wangwx2019/storyfun.git
  ```

- 文本由 OCR 自动生成，可能存在少量识别错误，例如页眉页脚、符号、单词断行、图片占位描述等。
- 如需引用或转载，请自行核对原文。

## 版权

图书内容版权归 **Cambridge University Press** 及作者所有：

- *Storyfun Level 1 Student's Book / Teacher's Book*, Second edition — Karen Saxby
- *Home Fun Booklet 1* — Melissa Owen

本仓库仅用于个人学习、教学与研究，不用于商业用途。如有侵权，请联系删除。
