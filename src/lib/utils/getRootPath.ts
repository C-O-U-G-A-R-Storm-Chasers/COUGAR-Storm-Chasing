export default function getRootPath() {
    return process.env.NODE_ENV === "development" ? "F:/" : "/data";
}