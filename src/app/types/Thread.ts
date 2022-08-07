import Message from "./Message";
import moment, {Moment} from "moment";

export default class Thread {
    private _id: string;
    private _name: string;
    private _lastUpdated: Moment;
    private _messages: Array<Message>;

    constructor(id: string, name: string, lastUpdated: string, messages: Array<Message>) {
        this._id = id;
        this._name = name;
        this._lastUpdated = moment(lastUpdated);
        this._messages = messages;
    }

    formattedDate(): string {
        return this._lastUpdated.format('MMMM Do YYYY, h:mm:ss a');
    }

    get messages(): Array<Message> {
        return this._messages.sort((a: Message, b: Message) => {
            if (a.lastUpdated.isAfter(b.lastUpdated)) {
                return 1;
            } else if (a.lastUpdated.isBefore(b.lastUpdated)) {
                return -1;
            }
            return 0;
        });
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get lastUpdated(): moment.Moment {
        return this._lastUpdated;
    }
}