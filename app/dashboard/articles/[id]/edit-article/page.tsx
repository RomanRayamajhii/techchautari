
import EditArticlesPage from '@/app/components/articles/editarticlepage'
import { prisma } from '@/lib/prisma'

const page = async({params}:{params:Promise<{id:string}>}) => {
    const article = await prisma.article.findUnique({
        where: {
            id: (await params).id,
        },
    });
    if(!article){
        return(
            <div>
                <p>Article not found</p>
            </div>
        )
    }


  return (
    <div>

        <EditArticlesPage article={article}/>
    </div>
  )
}

export default page