export default class Voicevox {
  private audio: HTMLAudioElement;

  constructor(speakerId: number, text: string, ttsQuestApiKey: string) {
    if (typeof window !== 'undefined') {
      this.audio = new Audio();
      let params: any = {};
      params['key'] = ttsQuestApiKey;
      params['speaker'] = speakerId;
      params['text'] = text;
      const query = new URLSearchParams(params);
      this.main(this, query);
    } else {
      throw new Error("Audio is not supported in this environment.");
    }
  }

  private main(owner: any, query: any) {
    if (owner.audio.src.length > 0) return;
    let apiUrl = 'https://api.tts.quest/v3/voicevox/synthesis';
    fetch(apiUrl + '?' + query.toString())
      .then(response => response.json())
      .then(response => {
        if (typeof response.retryAfter !== 'undefined') {
          setTimeout(owner.main, 1000 * (1 + response.retryAfter), owner, query);
        } else if (typeof response.mp3StreamingUrl !== 'undefined') {
          owner.audio.src = response.mp3StreamingUrl;
        } else if (typeof response.errorMessage !== 'undefined') {
          throw new Error(response.errorMessage);
        } else {
          throw new Error("serverError");
        }
      });
  }

  public play() {
    this.audio.play();
  }

  public pause() {
    this.audio.pause();
  }
}
