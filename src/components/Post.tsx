interface PostProps {
  author: string
  content: string
}

export function Post({ author, content }: PostProps) {
  return (
    <div>
      <h2>{author}</h2>
      <p>{content}</p>
    </div>
  )
}
