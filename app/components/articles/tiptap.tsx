'use client'

import { useEffect, useState } from 'react'
import { useEditor, EditorContent, type Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo2,
  Redo2,
} from 'lucide-react'

type Props = {
  name?: string
  defaultValue?: string
}

export default function Tiptap({
  name = 'content',
  defaultValue = '',
}: Props) {
  const [content, setContent] = useState('')

 const editor = useEditor({
  extensions: [StarterKit],
  immediatelyRender: false,
  onUpdate: ({ editor }) => {
    setContent(editor.getHTML())
  },
})
 useEffect(() => {
  if (editor && defaultValue) {
    editor.commands.setContent(defaultValue)
  }
}, [editor, defaultValue])

  if (!editor) return null

  const btnClass = (active: boolean) =>
    cn(
      'hover:bg-muted transition-colors',
      active && 'bg-muted text-foreground'
    )

  return (
    <div className="border rounded-md overflow-hidden">

      {/* Hidden input for Server Actions */}
    
      <input type="hidden" name={name} value={content || ''} />

      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 border-b bg-muted/30 p-2">

        <Button
          type="button"
          variant="ghost"
          size="sm"
          className={btnClass(editor.isActive('paragraph'))}
          onClick={() => editor.chain().focus().setParagraph().run()}
        >
          Text
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className={btnClass(editor.isActive('heading', { level: 1 }))}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          <Heading1 />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className={btnClass(editor.isActive('heading', { level: 2 }))}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <Heading2 />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className={btnClass(editor.isActive('heading', { level: 3 }))}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <Heading3 />
        </Button>

        <div className="w-px bg-border mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className={btnClass(editor.isActive('bold'))}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className={btnClass(editor.isActive('italic'))}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic />
        </Button>

        <div className="w-px bg-border mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className={btnClass(editor.isActive('bulletList'))}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className={btnClass(editor.isActive('orderedList'))}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className={btnClass(editor.isActive('blockquote'))}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quote />
        </Button>

        <div className="w-px bg-border mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo2 />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo2 />
        </Button>
      </div>

      {/* Editor */}
<div className='tiptap-editor'>
        <EditorContent editor={editor} />

      </div>
      
    </div>
  )
}


// 'use client'

// import { Button } from '@/components/ui/button'
// import { cn } from '@/lib/utils'
// import { EditorContent, type Editor, useEditor } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'
// import { useState } from 'react'
// import {
//   Bold,
//   Heading1,
//   Heading2,
//   Heading3,
//   Italic,
//   List,
//   ListOrdered,
//   Quote,
//   Redo2,
//   Undo2,
// } from 'lucide-react'

// const MenuBar = ({ editor }: { editor: Editor | null }) => {
//   if (!editor) {
//     return null
//   }

//   const buttonClass = (active: boolean) =>
//     cn(active && 'bg-muted text-foreground')

//   return (
//     <div
//       className='flex flex-wrap gap-1 rounded-t-md border border-b-0 bg-muted/30 p-2'
//       onMouseDown={(event) => event.preventDefault()}
//     >
//       <Button
//         type='button'
//         variant='ghost'
//         size='sm'
//         className={buttonClass(editor.isActive('paragraph'))}
//         onClick={() =>
//           editor.chain().focus().clearNodes().unsetAllMarks().run()
//         }
//       >
//         Normal text
//       </Button>
//       <Button
//         type='button'
//         variant='ghost'
//         size='icon-sm'
//         className={buttonClass(editor.isActive('bold'))}
//         onClick={() => editor.chain().focus().toggleBold().run()}
//         aria-label='Bold'
//       >
//         <Bold />
//       </Button>

//       <Button
//         type='button'
//         variant='ghost'
//         size='icon-sm'
//         className={buttonClass(editor.isActive('italic'))}
//         onClick={() => editor.chain().focus().toggleItalic().run()}
//         aria-label='Italic'
//       >
//         <Italic />
//       </Button>

//       <Button
//         type='button'
//         variant='ghost'
//         size='icon-sm'
//         className={buttonClass(editor.isActive('heading', { level: 1 }))}
//         onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
//         aria-label='Heading 1'
//       >
//         <Heading1 />
//       </Button>

//       <Button
//         type='button'
//         variant='ghost'
//         size='icon-sm'
//         className={buttonClass(editor.isActive('heading', { level: 2 }))}
//         onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
//         aria-label='Heading 2'
//       >
//         <Heading2 />
//       </Button>

//       <Button
//         type='button'
//         variant='ghost'
//         size='icon-sm'
//         className={buttonClass(editor.isActive('heading', { level: 3 }))}
//         onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
//         aria-label='Heading 3'
//       >
//         <Heading3 />
//       </Button>
//       <Button
//         type='button'
//         variant='ghost'
//         size='icon-sm'
//         className={buttonClass(editor.isActive('bulletList'))}
//         onClick={() => editor.chain().focus().toggleBulletList().run()}
//         aria-label='Bullet list'
//       >
//         <List />
//       </Button>

//       <Button
//         type='button'
//         variant='ghost'
//         size='icon-sm'
//         className={buttonClass(editor.isActive('orderedList'))}
//         onClick={() => editor.chain().focus().toggleOrderedList().run()}
//         aria-label='Numbered list'
//       >
//         <ListOrdered />
//       </Button>

//       <Button
//         type='button'
//         variant='ghost'
//         size='icon-sm'
//         className={buttonClass(editor.isActive('blockquote'))}
//         onClick={() => editor.chain().focus().toggleBlockquote().run()}
//         aria-label='Quote'
//       >
//         <Quote />
//       </Button>

//       <Button
//         type='button'
//         variant='ghost'
//         size='icon-sm'
//         onClick={() => editor.chain().focus().undo().run()}
//         disabled={!editor.can().chain().focus().undo().run()}
//         aria-label='Undo'
//       >
//         <Undo2 />
//       </Button>

//       <Button
//         type='button'
//         variant='ghost'
//         size='icon-sm'
//         onClick={() => editor.chain().focus().redo().run()}
//         disabled={!editor.can().chain().focus().redo().run()}
//         aria-label='Redo'
//       >
//         <Redo2 />
//       </Button>
//     </div>
//   )
// }

// const Tiptap = () => {
//   const [content, setContent] = useState('')

//   const editor = useEditor({
//     extensions: [StarterKit],
//     content,
//     immediatelyRender: false,
//     onUpdate: ({ editor }) => {
//       setContent(editor.getHTML())
//     },
//   })

//   return (
//     <div className='tiptap-editor'>
//       <input type='hidden' name='content' value={content} />
//       <MenuBar editor={editor} />
//       <EditorContent editor={editor} />
//     </div>
//   )
// }

// export default Tiptap
