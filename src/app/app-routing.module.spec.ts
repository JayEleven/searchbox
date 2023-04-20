import { AppRoutingModule } from './app-routing.module';

describe('AppRoutingModule', () => {
  
  it('it should construct', () => {
    // arrange
    const { build } = setup().default();
    // act
    const a = build();
    // assert
    // expect(a).toEqual
  });
  
});

function setup() {
  
  const builder = {
    
    
    default() {
      return builder;
    },
    build() {
      return new AppRoutingModule();
    }
  };

  return builder;
}
