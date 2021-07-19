export interface IOCardProps {
    valueChanger?: any;
    value: string | Object;
    heading: string;
    inputType?: string;
    sender?: any;
}

export interface IOCardState {
    inputType: string;
}
