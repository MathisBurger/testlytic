import React from "react";
import JSONInput from "react-json-editor-ajrm";
// @ts-ignore
import locale from "react-json-editor-ajrm/locale/en";
import {IOCardProps, IOCardState} from "../../typings/components/IO-Card";

export class IOCard extends React.Component<IOCardProps, IOCardState> {

    state: IOCardState = {
      inputType: "JSON"
    };

    constructor(props: IOCardProps) {
        super(props);
        if (props.inputType !== undefined) {
            this.state.inputType = props.inputType;
        }
    }

    // Checks if the value from the props is an empty string.
    // If not, it sets the JSONInout to onlyView and sets the value
    // as placeholder in the input
    getJSONInput(): JSX.Element {
        if (this.props.value === "") {
            return <JSONInput
                    locale={locale}
                    onChange={
                        this.props.valueChanger === undefined ?
                            null :
                            (e: any) => this.props.valueChanger(e)
                    }
                    colors={{
                        background: "#414141"
                    }}
                    width={"100%"}
                    height={"100%"}
                    style={{
                        outerBox: {
                            borderRadius: "10px",
                            overflow: "hidden"
                        }
                    }}
                />;
        } else {
            return <JSONInput
                    locale={locale}
                    placeholder={Object(this.props.value)}
                    viewOnly={true}
                    onChange={
                        this.props.valueChanger === undefined ?
                            null :
                            (e: any) => this.props.valueChanger(e)
                    }
                    colors={{
                        background: "#414141"
                    }}
                    width={"100%"}
                    height={"100%"}
                    style={{
                        outerBox: {
                            borderRadius: "10px",
                            overflow: "hidden"
                        }
                    }}
                />
        }
    }

    render() {
        return (
            <div className="io-card">
                <h1>{this.props.heading}</h1>
                <select size={1} onChange={
                    (e: any) => this.setState({inputType: e.target.value})
                }>
                    <option>JSON</option>
                    <option>TEXT</option>
                </select>
                {
                    this.state.inputType === "JSON" ?
                    this.getJSONInput() : (
                        <textarea
                            className="text-input"
                            onChange={(e: any) => this.props.valueChanger(e.target.value)}
                            value={this.props.value as string}
                        />
                    )
                }
            </div>
        );
    }
}
