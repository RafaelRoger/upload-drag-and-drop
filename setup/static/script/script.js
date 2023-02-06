const dropArea  = document.querySelector(".drag-area");
const form      = document.querySelector('.formulario');
const dragText  = document.querySelector("header");
const icon      = document.querySelector("i");
const fileInput = document.querySelector('.file-input')
const progress  = document.querySelector('.progress')
const btn       = document.querySelector('.btn')
let file;

btn.addEventListener('click', () => {
    fileInput.click();
})

dropArea.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropArea.classList.add('active');
    dragText.textContent = "Release to upload file"
    icon.classList.remove('fa-cloud-upload-alt')
    icon.classList.add('fa-cloud-download-alt')
});

dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove('active');
    dragText.textContent = "Click or Drag & Drop to upload file"
    icon.classList.remove('fa-cloud-download-alt')
    icon.classList.add('fa-cloud-upload-alt')
});

fileInput.onchange = ({ target }) => {
    let file = target.files[0];

    let fileType = file.type;

    let validExtension = ['audio/x-m4a', 'audio/mpeg', 'audio/x-ms-wma', 'audio/wav'];

    if (validExtension.includes(fileType)) {

        let fileSize = (file.size / (1024 * 1024)).toFixed(2)

        if (fileSize <= 100) {
            dadosForm = new FormData()
            dadosForm.append("file", file)
            post(dadosForm);
        } else {
            alert('the audio must to have a max of 100MB');
        }
    } else {
        alert('This is not a audio');
        dropArea.classList.remove('active')
    }
}

dropArea.addEventListener("drop", (event) => {
    event.preventDefault();

    file = event.dataTransfer.files[0];
    let fileType = file.type;
    console.log(fileType);
    let validExtension = ['audio/x-m4a', 'audio/mpeg', 'audio/x-ms-wma', 'audio/wav'];

    if (validExtension.includes(fileType)) {
        let fileSize = (file.size / (1024 * 1024)).toFixed(2)

        if (fileSize <= 100) {
            dadosForm = new FormData()
            dadosForm.append("file", file)
            post(dadosForm);
        } else {
            alert('the audio must to have a max of 100MB');
        }
    } else {
        alert('This is not a audio');
        dropArea.classList.remove('active')
    }
});

const post = (dadosForm) => {

    axios.post('http://127.0.0.1:8000/api/setup/', dadosForm, {
        onUploadProgress: (statusbar) => {
            let fileLoaded = Math.floor((statusbar.loaded / statusbar.total) * 100); 
            let fileTotal = Math.floor(statusbar.total / 1000); 
            let fileSize;
 
            (fileTotal < 1024) ? fileSize = fileTotal + " KB" : fileSize = (statusbar.loaded / (1024 * 1024)).toFixed(2) + " MB";
            let progressHTML = `<div class="spiner">
                                    <div class="percent">${fileLoaded}%</div>
                                </div>`;

            progress.classList.add("loading");
            progress.innerHTML = progressHTML;
        }
    })
    .then((response) => {
        //console.log(response.data.file);
        progress.innerHTML = "";
        progress.classList.remove("loading");
        transcribeAudio(response.data)
    })

}

const transcribeAudio = (data) => {

    axios.post('http://127.0.0.1:8000/transcribe/', {
        filename: data.file
    }, {
        onUploadProgress: (statusbar) => {
            progress.classList.add("preload");
        }
    }).then((response) => {
        console.log(response);
        progress.innerHTML = ''
        progress.classList.remove("loading");
        progress.classList.remove("preload");
        if (response.data.text !== undefined) {
            dropArea.setAttribute('action', "http://127.0.0.1:8000/openfile/")
            dropArea.setAttribute('method', "GET")
            dropArea.innerHTML = `
                <span>Your File is ready</span>
                <button>Open File</button>
            `
        } else {
            dropArea.innerHTML = `
                <span>${response.data.message}</span>
            `
            alert(response.data.message)
        }
    })
}