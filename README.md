# 💾 react-use-file-uploader

![version](https://img.shields.io/github/package-json/v/egor6-66/react-use-file-uploader)
![stars](https://img.shields.io/github/stars/egor6-66/react-use-file-uploader?style=social)
![forks](https://img.shields.io/github/forks/egor6-66/react-use-file-uploader?style=social)
![last commit](https://img.shields.io/github/last-commit/egor6-66/react-use-file-uploader/main)
![code size](https://img.shields.io/github/languages/code-size/egor6-66/react-use-file-uploader)
![minzip size](https://img.shields.io/bundlephobia/minzip/react-use-file-uploader)
![download](https://img.shields.io/npm/dt/react-use-file-uploader)

**Description** - 🔎 Download files with preview. The user part is written in typescript, autocomplete works.
The [jsmediatags](https://github.com/aadsm/jsmediatags/blob/master/dist/jsmediatags.min.js)   package is used to read
metadata.

## [🚀🚀🚀DEMO🚀🚀🚀](http://egorra0c.beget.tech/main/react_use_file_uploader/image_uploader)

## 💿 Installation

```
npm i react-use-file-uploader
```

## 💻 Example

```jsx
import useFileUploader from 'react-use-file-uploader';

function ImageUploader() {
  const {Uploader, files, isLoading, formData} = useFileUploader({
    accept: 'image',
    multiple: true,
    sizeType: 'mb',
    onOpen: () => {
      console.log('onOpen');
    },
    onClose: () => {
      console.log('onClose');
    },
    onCloseWithoutFiles: () => {
      console.log('onCloseWithoutFiles');
    },
    onAfterUploading: (data) => {
      console.log('onAfterUploading', data);
    },
  });

  return (
    <div>
      <Upload>
        <button>image upload</button>
      </Upload>
      <div>
        {isLoading ?
          <div>loading</div>
          :
          files.map((file) => (
            //your code
          ))}
      </div>
    </div>
  );
}
```

**or**

```jsx
import useFileUploader from 'react-use-file-uploader';

function ImageUploader() {
  const {open, files, isLoading, formData} = useFileUploader({
    accept: 'image',
    multiple: true,
    sizeType: 'mb',
    onOpen: () => {
      console.log('onOpen');
    },
    onClose: () => {
      console.log('onClose');
    },
    onCloseWithoutFiles: () => {
      console.log('onCloseWithoutFiles');
    },
    onAfterUploading: (data) => {
      console.log('onAfterUploading', data);
    },
  });

  return (
    <div>
      <button onClick={open}>image upload</button>
      <div>
        {isLoading ?
          <div>loading</div>
          :
          files.map((file) => (
            //your code
          ))}
      </div>
    </div>
  );
}
```

## Options

###         * - required

| Option                                             | Description                                                                                                                                                                                                                                                                                      | Default         
|----------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------| 
 <a id="accept">* accept</a>                        | image, audio, video, document, all                                                                                                                                                                                                                                                               |
 [multiple](http://htmlbook.ru/html/input/multiple) | [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)                                                                                                                                                                                              | false           
 defaultPreview                                     | Patch to img file                                                                                                                                                                                                                                                                                |
 <a id="formdata">formDataName</a>                  | string. You need to set values for this field if you want to form an formData                                                                                                                                                                                                                    |
 <a id="extension">extension</a>                    | Valid values in array: <br> Image: .jpeg / .jpg / .gif / .png / .pict / .ico / .svg / .webp <br> Audio: .ogg / .vorbis / .wav / .mp3 / .webm <br> Video: .mp4 / .ogg / .ogv / .webm / .mov <br> Document: .txt / .word / .rtf / .doc / .docx / .html / .pdf / .odt / .ppt / .pptx / .xls / .xlsx | all extensions  
 sizeFormat                                         | kb / mb / gb / tb                                                                                                                                                                                                                                                                                | byte            
 onOpen                                           | () => void, Сallback fired when file selector window opens.                                                                                                                                                                                                                                      |
 onClose                                           | () => void, Сallback fired when file selector window closed.                                                                                                                                                                                                                                     |
 onCloseWithoutFiles                                           | () => void, Сallback fired when file selector window closed, without Files.                                                                                                                                                                                                                      |
onAfterUploading| (data: {type: [accept](#accept), files: [files](#files), formData: FormData or null}) => void;                                                                                                                                                                                                   |
If the [extension](#extension) field is not set, then all formats of the selected file type will be allowed.

## Returned object

| Item      | Description                                                                                            
|-----------|--------------------------------------------------------------------------------------------------------
 Uploader  | FC<{ children: ReactNode }>                                                                            
 open      | () => void, opens file uploader on event                                                               
 clear     | () => void, clear the array                                                                            
 files     | The type is generated depending on the option  [accept](#accept)                                       
 isLoading | [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)    
 formData  | [FormData](https://javascript.info/formdata). You need to set a [formDataName](#formdata)  to generate 
 formData  | [FormData](https://javascript.info/formdata). You need to set a [formDataName](#formdata)  to generate 
sortByAccept | image: Image[], audio: Audio[], video: Video[], document: Document[]

## <a id="files">* Files</a>


### Image

```typescript
type Image = {
    id: number;
    fileUrl: string;
    name: string;
    size: string;
    file: File;
    remove: () => void;
};
```

![image](https://706326.selcdn.ru/gitAndNpm/react-use-file-uploader/images.png)

### Audio

```typescript
type Audio = {
    id: number;
    fileUrl: string;
    name: string;
    size: string;
    file: File;
    album: {
        coverUrl: string;
        name: string;
        artist: string;
        title: string;
        year: string;
    };
    remove: () => void;
};
```

![audio](https://706326.selcdn.ru/gitAndNpm/react-use-file-uploader/audioss.png)

### Video

```typescript
type Video = {
    id: number;
    fileUrl: string;
    name: string;
    size: string;
    file: File;
    previewUrl: string;
    remove: () => void;
};
```

![video](https://706326.selcdn.ru/gitAndNpm/react-use-file-uploader/videos.png)

### Document

```typescript
type Document = {
    id: number;
    fileUrl: string;
    name: string;
    size: string;
    file: File;
    remove: () => void;
};
```

![document](https://706326.selcdn.ru/gitAndNpm/react-use-file-uploader/documents.png)

---

## 🔗 Links

#### current project

* **[Npm](https://www.npmjs.com/package/react-use-file-uploader)**
* **[Github](https://github.com/egor6-66/react-use-file-uploader)**
* **[Codesandbox](https://codesandbox.io/s/react-use-file-uploader-88uh7o)**

#### other

* **[react-theme-change](https://www.npmjs.com/package/react-theme-change)**  