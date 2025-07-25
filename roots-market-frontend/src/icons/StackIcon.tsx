import { IconProps } from "./icon.model";

export function StackIcon({className}: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 4l-8 4l8 4l8 -4l-8 -4" />
            <path d="M4 12l8 4l8 -4" />
            <path d="M4 16l8 4l8 -4" />
        </svg>
    )
}