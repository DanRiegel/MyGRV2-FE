import { MyGRV2FEPage } from './app.po';

describe('my-grv2-fe App', () => {
  let page: MyGRV2FEPage;

  beforeEach(() => {
    page = new MyGRV2FEPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
