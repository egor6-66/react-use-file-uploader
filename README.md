# 💾 react-use-file-uploader

![version](https://img.shields.io/github/package-json/v/egor6-66/react-use-file-uploader)
![stars](https://img.shields.io/github/stars/egor6-66/react-use-file-uploader?style=social)
![forks](https://img.shields.io/github/forks/egor6-66/react-use-file-uploader?style=social)
![last commit](https://img.shields.io/github/last-commit/egor6-66/react-use-file-uploader/main)
![code size](https://img.shields.io/github/languages/code-size/egor6-66/react-use-file-uploader)

**Description** - 🔎 Download files with preview. The user part is written in typescript, autocomplete works. The [jsmediatags](https://github.com/aadsm/jsmediatags/blob/master/dist/jsmediatags.min.js)   package is used to read metadata.

**Complete example** - **🔗[codesandbox](https://codesandbox.io/s/react-use-file-uploader-k64526)**

## 💿 Installation

```
npm i react-use-file-uploader
```

## 💻 Example

```jsx
import useFileUploader from 'react-use-file-uploader';

function ImageUploader() {
  const [Uploader, files, isLoading] = useFileUploader({
    accept: 'image',
    multiple: true,
    sizeType: 'mb'
  });

  return (
    <div>
      <Uploader>
        <button>image upload</button>
      </Uploader>
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

###     * - required

| Option                                             | Description                                                                                                                                                                                                                                                                              | Default        
|----------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------| 
 <a id="accept">* accept</a>                        | image, audio, video, document                                                                                                                                                                                                                                                            |
 [multiple](http://htmlbook.ru/html/input/multiple) | [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)                                                                                                                                                                                      | false          
 defaultPreview                                     | Patch to img file                                                                                                                                                                                                                                                                        |
 <a id="formdata">formDataName</a>                  | string. You need to set values for this field if you want to form an formData                                                                                                                                                                                                            |
 <a id="extension">extension</a>                       | Valid values in array: <br> Image: .jpeg / .jpg / .gif / .png / .pict / .ico / .svg / .webp <br> Audio: .ogg / .vorbis / .wav / .mp3 / .webm <br> Video: .mp4 / .ogg / .ogv / .webm / .mov <br> Document: .txt / .rtf / .doc / .docx / .html / .pdf / .odt / .ppt / .pptx / .xls / .xlsx | all extensions 
 sizeFormat                 | kb / mb / gb / tb   | byte


If the [extension](#extension) field is not set, then all formats of the selected file type will be allowed.
 
## Returned tuple

| Item      | Description                                                                                            
|-----------|--------------------------------------------------------------------------------------------------------
 Uploader  | FC<{ children: ReactNode }>                                                                            
 files     | The type is generated depending on the accept option  [accept](#accept)                            
 isLoading | [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)    
 formData  | [FormData](https://javascript.info/formdata). You need to set a [formDataName](#formdata)  to generate  

## Files

### Image

```typescript
type Image = {
    id: number;
    previewUrl: string;
    name: string;
    size: string;
    file: File;
    //proxy 
    remove: () => void;
};
```

![image](https://706326.selcdn.ru/gitAndNpm/react-use-file-uploader/images.png)

### Audio

```typescript
type Audio = {
    id: number;
    audioUrl: string;
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
    //proxy 
    remove: () => void;
};
```

![audio](https://706326.selcdn.ru/gitAndNpm/react-use-file-uploader/audioss.png)

### Video

```typescript
type Video = {
    id: number;
    videoUrl: string;
    previewUrl: string;
    name: string;
    size: string;
    file: File;
    //proxy 
    remove: () => void;
};
```

![video](https://706326.selcdn.ru/gitAndNpm/react-use-file-uploader/videos.png)

### Document

```typescript
type Document = {
    id: number;
    documentUrl: string;
    name: string;
    size: string;
    file: File;
    //proxy 
    remove: () => void;
};
```

![document](https://706326.selcdn.ru/gitAndNpm/react-use-file-uploader/documents.png)