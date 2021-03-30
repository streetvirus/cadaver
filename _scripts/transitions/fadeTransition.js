import $ from 'jquery';
import Highway from '@dogstudio/highway';

export default class FadeTransition extends Highway.Transition {
  in({ from, to, trigger, done }) {
    $(from).remove()
    $(to)
      .hide()
      .fadeIn({
        duration: 400,
        easing: 'easeInOutCubic',
        complete: () => done()
      });
  }

  out({ from, trigger, done }) {
    $(from).fadeOut(() => done());
  }
}

/*
  This *sortof* works but was causing some pages to reload

  in({ from, to, trigger, done }) {
    console.log('in')
    $(to).addClass('transition-in')
    setTimeout(() => $(to).addClass('transition-in-active'), 30)
    setTimeout(() => {
      $(to).removeClass('transition-in transition-in-active');
      $(from).remove()
    }, 330)
  }

  out({ from, trigger, done }) {
    console.log('out')
    $(from).addClass('transition-out');
    done()
  }
  */