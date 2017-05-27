import { ShiganaiRadioPagePage } from './app.po';

describe('shiganai-radio-page App', () => {
  let page: ShiganaiRadioPagePage;

  beforeEach(() => {
    page = new ShiganaiRadioPagePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
