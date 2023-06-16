import { useEditor, Editor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import styles from './editor.module.scss';
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

import ImageGallery from '../image-gallery';
import { GalleryContext } from '../image-gallery/state/image-gallery.base';

interface ITipTapEditorProps {
  editor: Editor;
}

interface IEditorProps {
  content?: string;
  placeholder?: string;
  onEditorUpdate?: Dispatch<SetStateAction<string>>;
}
/* istanbul ignore next */
const MenuBar = ({ ...props }: ITipTapEditorProps) => {
  const { editor } = props;

  const galleryContext = useContext(GalleryContext);
  const [shouldSelectImage, setShouldSelectImage] = useState(false);
  const { toggleOpen, selectedImages, instanceid, setInstanceId, selectImage, removeSelectedImage} =
    galleryContext;
  const galleryId = 'rich-editor-gallery';

  const addImage = () => {
    setShouldSelectImage(true);
    toggleOpen();
    if (instanceid !== galleryId) {
      setInstanceId(galleryId);
    }
  };

  useEffect(() => {
    if (
      selectedImages[galleryId] &&
      instanceid === galleryId &&
      shouldSelectImage
    ) {
      editor
        .chain()
        .focus()
        .setImage({ src: selectedImages[galleryId].secureUrl })
        .run();
      setShouldSelectImage(false);
      removeSelectedImage(galleryId); 
      setInstanceId('');
    }
  }, [selectedImages, editor, instanceid, setInstanceId, shouldSelectImage, selectImage, removeSelectedImage]);

  return (
    <>
      <div className={styles.menuBar}>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? styles.activeMenuBtn : ''}
        >
          bold
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? styles.activeMenuBtn : ''}
        >
          italic
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? styles.activeMenuBtn : ''}
        >
          strike
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive('code') ? styles.activeMenuBtn : ''}
        >
          code
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
        >
          clear marks
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().clearNodes().run()}
        >
          clear nodes
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? styles.activeMenuBtn : ''}
        >
          paragraph
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive('heading', { level: 2 }) ? styles.activeMenuBtn : ''
          }
        >
          h2
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive('heading', { level: 3 }) ? styles.activeMenuBtn : ''
          }
        >
          h3
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editor.isActive('heading', { level: 4 }) ? styles.activeMenuBtn : ''
          }
        >
          h4
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={
            editor.isActive('heading', { level: 5 }) ? styles.activeMenuBtn : ''
          }
        >
          h5
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={
            editor.isActive('heading', { level: 6 }) ? styles.activeMenuBtn : ''
          }
        >
          h6
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? styles.activeMenuBtn : ''}
        >
          bullet list
        </button>
        <button type="button" onClick={addImage}>
          add image from URL
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? styles.activeMenuBtn : ''}
        >
          ordered list
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? styles.activeMenuBtn : ''}
        >
          code block
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? styles.activeMenuBtn : ''}
        >
          blockquote
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          horizontal rule
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHardBreak().run()}
        >
          hard break
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          undo
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          redo
        </button>
      </div>

      <ImageGallery identifier={galleryId} />
    </>
  );
};
/* istanbul ignore next */
const Tiptap = ({ ...props }: ITipTapEditorProps & IEditorProps) => {
  return (
    <EditorContent
      editor={props.editor}
      content={props.content}
      className={styles.input}
    />
  );
};

const RichEditor = ({ ...props }: IEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'rich-text__image',
        },
      }),
    ],
    content: props.content,
    /* istanbul ignore next */
    onUpdate({ editor }) {
      /* istanbul ignore next */
      props.onEditorUpdate && props.onEditorUpdate(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div data-testid="editor" className={styles.editor}>
      <MenuBar editor={editor} />
      <Tiptap editor={editor} content={props.content} />
    </div>
  );
};

export default RichEditor;
