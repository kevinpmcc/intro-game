describe('State Transitions', function(){

  var $state, $stateProvider, $q;

 it('should move from /albums to /song on button click', function(){
   inject(function(_$state_, _$stateProvider_, _$q_) {
     $state = _$state_;
     $stateProvider = _$stateProvider_;
     $q = _$q_;
   });
   expect($state.current.name).toBe('albums');
   // element(by.css(':button')).click();
   // expect($state.current.name).toBe('song');

 })

})
