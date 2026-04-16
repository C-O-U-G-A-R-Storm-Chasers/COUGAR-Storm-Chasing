export default function FormResetButton() {
    return (
        <button
            type="reset"
            className="
                p-1

                text-xs
                font-semibold

                hover:underline

                rounded-sm
                cursor-pointer
            "
        >
            Reset
        </button>
    );
}