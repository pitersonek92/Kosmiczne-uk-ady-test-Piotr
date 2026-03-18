import { State } from "./state";
import * as styles from "./styles/style.css";

export interface RebusOptions {
    imagePath: string;
    answer: string;
    hint?: string;
}

export class Rebus {
    private _disposed: boolean = false;
    private _id: string;
    private _state: State;
    private _container: HTMLElement;
    private _imagePath: string;
    private _answer: string;
    private _imageElement: HTMLImageElement;
    private _inputElement: HTMLInputElement;
    private _hintElement?: HTMLElement;

    constructor(id: string, container: HTMLElement, state: State, options: RebusOptions) {
        this._id = id;
        this._container = container;
        this._state = state;
        this._imagePath = options.imagePath;
        this._answer = options.answer;

        this._imageElement = document.createElement("img");
        this._imageElement.src = this._imagePath;
        this._container.appendChild(this._imageElement);

        this._inputElement = document.createElement("input");
        this._inputElement.type = "text";
        this._inputElement.placeholder = "Wpisz odpowiedź tutaj";
        this._inputElement.className = styles["answer-input"];
        this._inputElement.value = this._state.get()[this._id] || "";
        this._container.appendChild(this._inputElement);

        if (options.hint) {
            const hintElement = document.createElement("div");
            hintElement.className = styles["hint"];
            hintElement.innerText = options.hint;
            this._container.appendChild(hintElement);
            this._hintElement = hintElement;
        }

        this.checkAnswer();

        this._inputElement.addEventListener("change", () => {
            this.checkAnswer();
        });
        // this._inputElement.addEventListener("focus", () => {
        //     this.checkAnswer();
        // });
        this._inputElement.addEventListener("blur", () => {
            this._state.set({ [this._id]: this._inputElement.value });
        });
        this._inputElement.addEventListener("input", () => {
            this.checkAnswer();
        });
    }

    dispose(): void {
        if (this._disposed) {
            return;
        }

        this._disposed = true;

        if (this._hintElement) {
            this._hintElement.remove();
            this._hintElement = undefined;
        }
        this._imageElement.remove();
        this._inputElement.remove();
        this._imageElement = null!;
        this._inputElement = null!;
    }

    getId(): string {
        return this._id;
    }

    // getAnswer(): string {
    //     return this._inputElement.value;
    // }

    // setAnswer(answer: string): void {
    //     this._inputElement.value = answer;
    //     this.checkAnswer();
    // }

    isCorrectAnswer(): boolean {
        return this._inputElement.value.trim().toLowerCase() === this._answer.toLowerCase();
    }

    checkAnswer(): void {
        if (document.activeElement === this._inputElement) {
            if (this.isCorrectAnswer()) {
                this._inputElement.classList.add(styles.correct);
                this._state.set({ [this._id]: this._inputElement.value });
            } else {
                this._inputElement.classList.remove(styles.correct);
                this._inputElement.classList.remove(styles.incorrect);
            }
        } else {
            if (this._inputElement.value.trim() === "") {
                this._inputElement.classList.remove(styles.correct);
                this._inputElement.classList.remove(styles.incorrect);
            } else {
                if (this.isCorrectAnswer()) {
                    this._inputElement.classList.add(styles.correct);
                    this._inputElement.classList.remove(styles.incorrect);
                } else {
                    this._inputElement.classList.add(styles.incorrect);
                    this._inputElement.classList.remove(styles.correct);
                }
            }

        }
    }
}