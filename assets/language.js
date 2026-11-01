// @ts-check
/** @typedef {Record<string, string>} Messages */

/** @type {Record<string, Messages>} Words for each supported language. */
const messages = {
    ja: {
        title: "MarSa-WebDev — Webをつくる、試す、記録する。",
        description: "MarSa-WebDevの個人サイト。Web制作や日々の試行錯誤を記録しています。",
        homeLabel: "MarSa-WebDev ホーム",
        navLabel: "メインナビゲーション",
        deckLabel: "ページカード。表示中のカードをクリックまたはタップして選べます。マウスホイールや左右の矢印キーでも切り替えできます。",
        topLabel: "トップ",
        hintLabel: "カードの操作方法",
        hintText: "裏に見えているカードをクリック／タップすると中央に移動します。マウスホイールや矢印キーでも切り替えられます。",
        heroTitleA: "Webをつくる。",
        heroTitleB: "試す、記録する。",
        heroCopy: "こんにちは、MarSaです。Web制作のことや、日々の小さな試行錯誤をこの場所に記録していきます。",
        heroLink: "このサイトについて",
        heroNote: "つくりながら、学ぶ。",
        aboutTitleA: "小さくつくって、",
        aboutTitleB: "丁寧に育てる。",
        aboutCopy: "MarSa-WebDevの個人サイトです。Webのアイデアを形にすること、試してみて分かったことを残すこと。ここを拠点に、制作物や学びを少しずつ増やしていきます。",
        focusTitleA: "気になっていること、",
        focusTitleB: "つくっているもの。",
        focusOneTitle: "Web制作",
        focusOneCopy: "アイデアを、使いやすく心地よいWebページにすること。",
        focusTwoTitle: "試行錯誤",
        focusTwoCopy: "新しい表現や技術を、小さな実験から試してみること。",
        focusThreeTitle: "記録する",
        focusThreeCopy: "つくる過程で得た気づきや学びを、言葉にして残すこと。",
        viewsTitleA: "好きなものにも、",
        viewsTitleB: "言いたいことがある。",
        viewsOne: "Web言語は好きだけど嫌い。",
        viewsTwo: "いつの時代もスクリプト言語よりコンパイル言語が重要視されるべき。",
        viewsThree: "マルチプラットフォーム？ クロスプラットフォーム？ いや、ネイティブしか興味ないね。",
        nowTitle: "まずは、この場所から。",
        nowCopy: "このページは、HTMLとCSSだけでつくった小さな静的サイトです。特別なビルド環境は必要ありません。これから少しずつ、ここに新しい制作や記録を加えていきます。"
    },
    "en-US": {
        title: "MarSa-WebDev — Making, trying, and recording the web.",
        description: "The personal site of MarSa-WebDev. A record of web projects and everyday experiments.",
        homeLabel: "MarSa-WebDev home",
        navLabel: "Main navigation",
        deckLabel: "Page cards. Click or tap a card to bring it to the front. The mouse wheel and the left and right arrow keys also work.",
        topLabel: "Top",
        hintLabel: "How to use the cards",
        hintText: "Click or tap a card behind the front one to bring it to the center. The mouse wheel and arrow keys work too.",
        heroTitleA: "Making the web.",
        heroTitleB: "Trying. Recording.",
        heroCopy: "Hi, I'm MarSa. I'll keep a record here of my web work and the small experiments I run along the way.",
        heroLink: "About this site",
        heroNote: "Learning by making.",
        aboutTitleA: "Make small,",
        aboutTitleB: "grow with care.",
        aboutCopy: "This is the personal site of MarSa-WebDev. It is a place to shape web ideas and to keep what I learn from trying them. From here, I will add projects and lessons little by little.",
        focusTitleA: "What I'm curious about,",
        focusTitleB: "what I'm making.",
        focusOneTitle: "Web work",
        focusOneCopy: "Turning ideas into web pages that are easy and pleasant to use.",
        focusTwoTitle: "Experiments",
        focusTwoCopy: "Trying new ideas and methods through small experiments.",
        focusThreeTitle: "Keeping notes",
        focusThreeCopy: "Putting what I notice and learn while making into words.",
        viewsTitleA: "Even favorite things",
        viewsTitleB: "deserve a few words.",
        viewsOne: "I love web languages, and I hate them.",
        viewsTwo: "In every era, compiled languages should matter more than scripting languages.",
        viewsThree: "Multi-platform? Cross-platform? No, I only care about native.",
        nowTitle: "To begin, right here.",
        nowCopy: "This page is a small static site made with only HTML and CSS. No special build setup is needed. Little by little, I will add new work and notes here."
    }
};

/** @type {Messages} Words that differ in British and Australian English. */
const commonwealth = {
    hintText: "Click or tap a card behind the front one to bring it to the centre. The mouse wheel and arrow keys work too.",
    title: "MarSa-WebDev — Making, trying and recording the web.",
    viewsTitleA: "Even favourite things"
};

messages["en-GB"] = { ...messages["en-US"], ...commonwealth };
messages["en-AU"] = { ...messages["en-US"], ...commonwealth };

/** @type {Record<string, string>} Open Graph locale code for each language. */
const localeCodes = { ja: "ja_JP", "en-US": "en_US", "en-GB": "en_GB", "en-AU": "en_AU" };

/** @type {string} Key used to remember the visitor's choice. */
const savedKey = "site-language";

/**
 * Picks the best supported language for a browser language tag.
 * @param {string} tag A tag such as "en-NZ" or "ja-JP".
 * @returns {string | undefined} A supported language, or nothing when the tag is unknown.
 */
function matchLanguage(tag) {
    const lower = tag.toLowerCase();
    if (lower.startsWith("ja")) return "ja";
    if (lower === "en-au") return "en-AU";
    if (/^en-(gb|ie|nz|za|in|ca|sg)/.test(lower)) return "en-GB";
    if (lower.startsWith("en")) return "en-US";
    return undefined;
}

/**
 * Chooses the starting language: a saved choice first, then the browser settings.
 * @returns {string} A supported language.
 */
function chooseLanguage() {
    let saved = null;
    try {
        saved = localStorage.getItem(savedKey);
    } catch (error) {
        saved = null;
    }
    if (saved && messages[saved]) return saved;
    for (const tag of navigator.languages || [navigator.language]) {
        const match = matchLanguage(tag);
        if (match) return match;
    }
    return "en-US";
}

/**
 * Writes every translated word into the page.
 * @param {string} language A supported language.
 * @returns {void}
 */
function applyLanguage(language) {
    const words = messages[language];
    document.documentElement.lang = language;
    for (const element of document.querySelectorAll("[data-text]")) {
        element.textContent = words[element.getAttribute("data-text")];
    }
    for (const element of document.querySelectorAll("[data-label]")) {
        element.setAttribute("aria-label", words[element.getAttribute("data-label")]);
    }
    for (const element of document.querySelectorAll("[data-content]")) {
        element.setAttribute("content", words[element.getAttribute("data-content")]);
    }
    document.querySelector('meta[property="og:locale"]').setAttribute("content", localeCodes[language]);
    const siteData = document.querySelector("#site-data");
    const record = JSON.parse(siteData.textContent);
    record.description = words.description;
    record.inLanguage = language;
    siteData.textContent = JSON.stringify(record, null, 4);
}

/** @type {HTMLElement} Wrapper of the globe button and its branch. */
const languageTree = document.querySelector("#language-tree");

/** @type {HTMLButtonElement} Globe button that opens the branch. */
const languageToggle = document.querySelector("#language-toggle");

/** @type {HTMLButtonElement[]} One button for each language. */
const languageLeaves = [...languageTree.querySelectorAll(".language-leaf")];

/**
 * Opens or closes the branch of languages.
 * @param {boolean} open True to show the branch.
 * @returns {void}
 */
function setBranchOpen(open) {
    languageTree.classList.toggle("is-open", open);
    languageToggle.setAttribute("aria-expanded", String(open));
}

/**
 * Marks the leaf of the chosen language.
 * @param {string} language A supported language.
 * @returns {void}
 */
function markLeaf(language) {
    for (const leaf of languageLeaves) {
        if (leaf.dataset.language === language) {
            leaf.setAttribute("aria-current", "true");
        } else {
            leaf.removeAttribute("aria-current");
        }
    }
}

const startLanguage = chooseLanguage();
markLeaf(startLanguage);
applyLanguage(startLanguage);

languageToggle.addEventListener("click", () => {
    setBranchOpen(!languageTree.classList.contains("is-open"));
});

for (const leaf of languageLeaves) {
    leaf.addEventListener("click", () => {
        const language = leaf.dataset.language;
        applyLanguage(language);
        markLeaf(language);
        setBranchOpen(false);
        languageToggle.focus();
        try {
            localStorage.setItem(savedKey, language);
        } catch (error) {
            // Storage may be blocked. The choice then lasts for this visit only.
        }
    });
}

document.addEventListener("click", (event) => {
    if (!languageTree.contains(/** @type {Node} */ (event.target))) setBranchOpen(false);
});

languageTree.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        setBranchOpen(false);
        languageToggle.focus();
    }
});
