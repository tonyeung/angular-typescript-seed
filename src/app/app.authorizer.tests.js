describe('Authorizer factory', function () {
  	var expect = chai.expect;
  
    beforeEach(function () {
      module('app');
    });

    it('should not be null', inject(function (Authorizer) {
        var service = Authorizer;
        expect(service).to.be.ok;
    }));

    it('should return true', inject(function (Authorizer) {
        var authorized = Authorizer.authorize();
        expect(authorized).to.be.true;
    }));
});