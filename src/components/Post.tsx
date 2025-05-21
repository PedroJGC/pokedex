interface PostProps {
  author: string
  content: string
}

export function Post({ author, content }: PostProps) {
  return (
    <div className="w-[6rem] h-[6rem] bg-blue-500 ">
      <h2 className="text-[50px]">{author}</h2>
      <p>{content}</p>
    </div>
  )
}
