type VideoModel = {
    mainTitle: string;
    mainUrl: URL;
    backupTitle: string;
    backupUrl: URL;
    height: number;
    width: number;
};

type FormControls = {
    form: HTMLFormElement
    height: HTMLInputElement,
    width: HTMLInputElement,
    mainVideo: HTMLSelectElement,
    backupVideo: HTMLSelectElement
}

type Stringify<T> = {
    [K in keyof T]: string;
}

type FormControlsOptional = Partial<FormControls>;
// type VideoSettings = Stringify<VideoModel>;
type VideoSettings = Record<keyof VideoModel, string>;
type VideoSettingsOptional = Partial<VideoSettings>;
type VideoBackupSettings = Pick<VideoSettings, "backupTitle" | "backupUrl">;
type VideoSelection = {
    title: string,
    url: `https://www.youtube.com/embed/${string}`
};

const videoDefaults: VideoSettings = {
    mainTitle: "GOTO Amsterdam 2019 Highlights",
    mainUrl: "https://www.youtube.com/embed/0sVzFzOXSPY",
    backupTitle: "GOTO Amsterdam 2018 Highlights",
    backupUrl: "https://www.youtube.com/embed/jXceAaIr6mA",
    height: "315",
    width: "560"
}

const videoSelection: VideoSelection[] = [
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

type PageElements = {
    videoSettingsForm: HTMLFormElement,
    videoHeight: HTMLInputElement,
    videoWidth: HTMLInputElement,
    mainVideoURL: HTMLSelectElement,
    backupVideoURL: HTMLSelectElement,
    videoTitle: HTMLHeadingElement,
    theVideo: HTMLIFrameElement,
    switchButton: HTMLButtonElement
}

function findElementWithID<T extends keyof PageElements>(id: T): PageElements[T] {
    const result = document.getElementById(id);
    if (result === null) {
        throw new Error(`Cannot find Element with id: ${id}`);
    }
    return result as PageElements[T];
}

function loadFormControls(): FormControls {

    const controls: FormControlsOptional = {};
    controls.form = findElementWithID("videoSettingsForm");
    controls.height = findElementWithID("videoHeight");
    controls.width = findElementWithID("videoWidth");
    controls.mainVideo = findElementWithID("mainVideoURL");
    controls.backupVideo = findElementWithID("backupVideoURL");

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

// TODO 5a - Instead of any, use a type which is all the numeric fields from VideoModel
//           Create a mapped type with conditional to extract the number fields from any type
//           - HINT: Look at https://www.typescriptlang.org/docs/handbook/2/conditional-types.html
function logNumbers(dimensions: any) {
    Object.entries(dimensions).forEach(([key, value]) => console.log(`${key} = ${value}`));
}

function onFormSubmit(event: Event) {
    console.log("Settings form submitted");

    event.preventDefault();

    const videoTitle = findElementWithID("videoTitle");
    const video = findElementWithID("theVideo");

    const settings = loadSettings();

    video.height = settings.height;
    video.width = settings.width;
    video.src = settings.mainUrl;

    logNumbers({
        height: Number(settings.width),
        width: Number(settings.height),
    });

    videoTitle.textContent = settings.mainTitle;

    backupVideo.backupTitle = settings.backupTitle;
    backupVideo.backupUrl = settings.backupUrl;
}

function switchVideo(event: Event) {
    console.log("Switch video clicked")

    event.preventDefault();

    const videoTitle = findElementWithID("videoTitle");
    const video = findElementWithID("theVideo");

    videoTitle.textContent = backupVideo.backupTitle;
    video.src = backupVideo.backupUrl;
}

function populateSelectWithOptions(select: HTMLSelectElement) {
    videoSelection.forEach(item => {
        const option = document.createElement("option");
        option.setAttribute("value", item.url);
        option.textContent = item.title;
        select.appendChild(option);
    });
}

export function doSetupV5() {
    const controls = loadFormControls();

    const switchButton = findElementWithID("switchButton");
    const videoTitle = findElementWithID("videoTitle");
    const video = findElementWithID("theVideo");

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