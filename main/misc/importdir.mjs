import glob from "fast-glob"
import url from "node:url"
import path from "node:path"

const useDefault = (module) => module.default
const importdir = async (meta, dir, use = useDefault) => {
    const root = url.fileURLToPath(meta.url)
    const cwd = path.dirname(root)

    const files = await glob([`${dir}/**/*.mjs`, "!**/$*"], { cwd })
    const resolved = {}
    for (const file of files) {
        const key =
            file.slice(dir.length + 1, -4)
                .replace(/\//g, ".")
        resolved[key] = use(
            await import(
                url.pathToFileURL(
                    path.resolve(cwd, file)
                )
            )
        )
    }

    return resolved
}

export default importdir
