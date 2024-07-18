export default class TtsQuestV3Voicevox extends Audio {
  constructor(speakerId: number, text: string, ttsQuestApiKey: string) {
    super();
    let params: any = {};
    params['key'] = ttsQuestApiKey;
    params['speaker'] = speakerId;
    params['text'] = text;
    const query = new URLSearchParams(params);
    this.main(this, query);
  }
  private main(owner: any, query: any) {
    if (owner.src.length>0) return;
    let apiUrl = 'https://api.tts.quest/v3/voicevox/synthesis';
    fetch(apiUrl + '?' + query.toString())
    .then(response => response.json())
    .then(response => {
      if (typeof response.retryAfter !== 'undefined') {
        setTimeout(owner.main, 1000*(1+response.retryAfter), owner, query);
      }
      else if (typeof response.mp3StreamingUrl !== 'undefined') {
        owner.src = response.mp3StreamingUrl;
      }
      else if (typeof response.errorMessage !== 'undefined') {
        throw new Error(response.errorMessage);
      }
      else {
        throw new Error("serverError");
      }
    });
  }
}
