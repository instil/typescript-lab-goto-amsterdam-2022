type MyPartial<T> = {
    [K in keyof T]?: T[K];
};

type VideoSettings = {
    mainTitle: string;
    mainUrl: string;
    backupTitle: string;
    backupUrl: string;
    height: string;
    width: string;
};

type FormControls = {
    form: HTMLFormElement
    height: HTMLInputElement,
    width: HTMLInputElement,
    mainVideo: HTMLSelectElement,
    backupVideo: HTMLSelectElement
}

type FormControlsOptional = MyPartial<FormControls>;
type VideoSettingsOptional = MyPartial<VideoSettings>;

// TODO 2a - Derive the VideoBackupSettings type from VideoSettings
//          - Look at the Pick type - https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys
type VideoBackupSettings = {
    backupTitle: string;
    backupUrl: string;
};

const videoDefaults: VideoSettings = {
    mainTitle: "GOTO Amsterdam 2019 Highlights",
    mainUrl: "https://www.youtube.com/embed/0sVzFzOXSPY",
    backupTitle: "GOTO Amsterdam 2018 Highlights",
    backupUrl: "https://www.youtube.com/embed/jXceAaIr6mA",
    height: "315",
    width: "560"
}

// TODO 2b - Create a type for VideoSelection (each item)
//           - The type should use a Template Literal Type to make the URL more type safe
//             https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html
const videoSelections = [
    {
        title: "Knowing Me, Knowing You",
        url: "https://www.youtube.com/embed/iUrzicaiRLU"
    },
    {
        title: "Mamma Mia",
        url: "https://www.youtube.com/embed/unfzfe8f9NI"
    },
    {
        title: "Money, Money, Money",
        url: "https://www.youtube.com/embed/ETxmCCsMoD0"
    },
    {
        title: "Super Trouper",
        url: "https://www.youtube.com/embed/BshxCIjNEjY"
    }
];

let backupVideo: VideoBackupSettings = {
    backupUrl: videoDefaults.backupUrl,
    backupTitle: videoDefaults.backupTitle
}

function loadFormControls(): FormControls {
    const controls: FormControlsOptional = {};
    controls.form = document.getElementById("videoSettingsForm") as HTMLFormElement;
    controls.height = document.getElementById("videoHeight") as HTMLInputElement;
    controls.width = document.getElementById("videoWidth") as HTMLInputElement;
    controls.mainVideo = document.getElementById("mainVideoURL") as HTMLSelectElement;
    controls.backupVideo = document.getElementById("backupVideoURL") as HTMLSelectElement;

    return controls as FormControls;
}

function loadSettings(): VideoSettings {
    const controls = loadFormControls();
    const settings: VideoSettingsOptional = {};

    settings.height = controls.height.value;
    settings.width = controls.width.value;

    const mainVideoOption = controls.mainVideo.selectedOptions[0];
    settings.mainUrl = mainVideoOption.value;
    const mainTitleText = mainVideoOption.textContent;
    if (mainTitleText !== null) {
        settings.mainTitle = mainTitleText;
    } else {
        settings.mainTitle = "No title for main selection";
    }

    const backupVideoOption = controls.backupVideo.selectedOptions[0];
    settings.backupUrl = backupVideoOption.value;
    const backupTitleText = backupVideoOption.textContent;
    if (backupTitleText !== null) {
        settings.backupTitle = backupTitleText;
    } else {
        settings.backupTitle = "No title for backup selection";
    }

    return settings as VideoSettings;
}

function onFormSubmit(event: Event) {
    console.log("Settings form submitted");

    event.preventDefault();

    const videoTitle = document.getElementById("videoTitle") as HTMLHeadingElement;
    const video = document.getElementById("theVideo") as HTMLIFrameElement;

    const settings = loadSettings();

    video.height = settings.height;
    video.width = settings.width;
    video.src = settings.mainUrl;

    videoTitle.textContent = settings.mainTitle;

    backupVideo.backupTitle = settings.backupTitle;
    backupVideo.backupUrl = settings.backupUrl;
}

function switchVideo(event: Event) {
    console.log("Switch video clicked")

    event.preventDefault();

    const videoTitle = document.getElementById("videoTitle") as HTMLHeadElement;
    const video = document.getElementById("theVideo") as HTMLIFrameElement;

    videoTitle.textContent = backupVideo.backupTitle;
    video.src = backupVideo.backupUrl;
}

function populateSelectWithOptions(select: HTMLSelectElement) {
    videoSelections.forEach(item => {
        const option = document.createElement("option");
        option.setAttribute("value", item.url);
        option.textContent = item.title;
        select.appendChild(option);
    });
}

export function doSetupV2() {
    const controls = loadFormControls();

    const switchButton = document.getElementById("switchButton") as HTMLButtonElement;
    const videoTitle = document.getElementById("videoTitle") as HTMLHeadingElement;
    const video = document.getElementById("theVideo") as HTMLIFrameElement;

    populateSelectWithOptions(controls.mainVideo);
    populateSelectWithOptions(controls.backupVideo);

    controls.form.onsubmit = onFormSubmit;
    switchButton.onclick = switchVideo;

    controls.width.value = videoDefaults.width;
    controls.height.value = videoDefaults.height;

    video.src = videoDefaults.mainUrl;
    video.height = videoDefaults.height;
    video.width = videoDefaults.width;
    videoTitle.textContent = videoDefaults.mainTitle;
}