export default function FormResetButton() {
    return (
        <button
            type="reset"
            className="
                p-2
                px-4

                bg-gradient-to-br
                from-zinc-500
                to-zinc-700
                hover:from-zinc-600
                hover:to-zinc-500

                border-1
                border-zinc-50/20

                text-sm
                font-semibold
                rounded-sm
                cursor-pointer
            "
        >
            Reset
        </button>
    );
}