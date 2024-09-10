//({ params }: { params: { slug: string } }) 
import {promises as fs} from "fs";
import path from "path";

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
  ) {
    const slug = params.slug // 'a', 'b', or 'c'
    const base = process.cwd();
    const fullPath = path.join(base, 'upload-files','qrcodes', `${slug}.png`);

    try {
        await fs.access(fullPath);
        const file = await fs.readFile(fullPath);
        return new Response(file, {
          headers: {
            'Content-Type': 'image/png',
          },
        });
      } catch (error) {
        return new Response('File not found', { status: 404 });
      }
  }