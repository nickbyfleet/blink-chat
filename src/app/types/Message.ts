import moment, {Moment} from "moment";

export default class Message {
    private _id: string;
    private _text: string;
    private readonly _lastUpdated: Moment;
    private readonly _sentByCurrentUser: boolean | undefined;

    constructor(id: string, message: string, lastUpdated: string, sentByCurrentUser?: boolean) {
        this._id = id;
        this._text = message;
        this._lastUpdated = moment(lastUpdated);
        this._sentByCurrentUser = sentByCurrentUser;
    }

    formattedDate(): string {
        return this.lastUpdated.format('MMMM Do YYYY, h:mm:ss a');
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get text(): string {
        return this._text;
    }

    set text(value: string) {
        this._text = value;
    }

    get lastUpdated(): Moment {
        return this._lastUpdated;
    }

    get sentByCurrentUser(): boolean {
        return this._sentByCurrentUser === undefined ? (this.lastUpdated.second() % 2 === 0) : this._sentByCurrentUser;
    }
}