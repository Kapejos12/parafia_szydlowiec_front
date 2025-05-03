import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export interface MarkdownProps {
    markdown: string;
}

const MarkdownComponent = (props: MarkdownProps) => {
    return (
        <div className="prose max-w-none dark:prose-invert px-4 py-6">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {props.markdown}
            </ReactMarkdown>
        </div>
    )
}

export default MarkdownComponent