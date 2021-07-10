export interface IOCardProps {
    valueChanger?: any;
    value: string | Object;
    heading: string;
    inputType?: string;
}

export interface IOCardState {
    inputType: string;
}
