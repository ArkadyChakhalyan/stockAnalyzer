type TNumInputFields = {
    adornment?: string;
}

type TNumInputEvents = {
    onSave: (value: string) => void;
}

export type TNumInputProps = TNumInputFields & TNumInputEvents;