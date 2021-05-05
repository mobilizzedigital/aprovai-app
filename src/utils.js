import differenceInDays from 'date-fns/differenceInDays';
import { PROGRESS_TYPES } from './constants';

export function cn(names) {
  return names.reduce((acc, v) => `${acc} ${v}`, '').trim();
}

export function urlParamsToObject(params) {
  if (!params) return {};

  return params
    .replace('?', '')
    .split('&')
    .reduce((acc, current) => {
      const [key, value] = current.split('=');
      return {
        ...acc,
        [key]: value,
      };
    }, []);
}

export function formatMoney(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function formatTimelineItems(items) {
  return items.map((progress) => {
    let message = '';
    let action = '';

    switch (progress.situacao) {
      case PROGRESS_TYPES.approved:
      case PROGRESS_TYPES.fileApproved:
        message = 'Aprovou este item';
        action = 'approve';
        break;
      case PROGRESS_TYPES.requestedAdjust:
        message = 'Pediu ajuste neste item';
        action = 'adjust';
        break;
      case PROGRESS_TYPES.sent:
        message = 'Enviou o item para aprovação';
        action = 'send';
        break;
      case PROGRESS_TYPES.reSent:
        message = 'Reenviou o item para aprovação';
        action = 'send';
        break;
      case PROGRESS_TYPES.viewed:
        message = 'Visualizou este item';
        action = 'view';
        break;
      default:
    }

    return {
      key: `timeline_${progress.id}`,
      image: progress.logoUrl,
      author: progress.usuario,
      comment: progress.comentario,
      date: progress.dataAndamento,
      action: action,
      message,
    };
  });
}

export function scrollToElement(
  destination,
  duration = 200,
  easing = 'linear',
  callback = () => {}
) {
  const easings = {
    linear(t) {
      return t;
    },
    easeInQuad(t) {
      return t * t;
    },
    easeOutQuad(t) {
      return t * (2 - t);
    },
    easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },
    easeInCubic(t) {
      return t * t * t;
    },
    easeOutCubic(t) {
      return --t * t * t + 1;
    },
    easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    },
    easeInQuart(t) {
      return t * t * t * t;
    },
    easeOutQuart(t) {
      return 1 - --t * t * t * t;
    },
    easeInOutQuart(t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
    },
    easeInQuint(t) {
      return t * t * t * t * t;
    },
    easeOutQuint(t) {
      return 1 + --t * t * t * t * t;
    },
    easeInOutQuint(t) {
      return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
    },
  };

  const start = window.pageYOffset;
  const startTime =
    'now' in window.performance ? performance.now() : new Date().getTime();

  const documentHeight = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  );
  const windowHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.getElementsByTagName('body')[0].clientHeight;
  const destinationOffset =
    typeof destination === 'number' ? destination : destination.offsetTop;
  const destinationOffsetToScroll = Math.round(
    documentHeight - destinationOffset < windowHeight
      ? documentHeight - windowHeight
      : destinationOffset
  );

  if ('requestAnimationFrame' in window === false) {
    window.scroll(0, destinationOffsetToScroll);
    if (callback) {
      callback();
    }
    return;
  }

  function scroll() {
    const now =
      'now' in window.performance ? performance.now() : new Date().getTime();
    const time = Math.min(1, (now - startTime) / duration);
    const timeFunction = easings[easing](time);
    window.scroll(
      0,
      Math.ceil(timeFunction * (destinationOffsetToScroll - start) + start)
    );

    if (window.pageYOffset === destinationOffsetToScroll) {
      if (callback) {
        callback();
      }
      return;
    }

    requestAnimationFrame(scroll);
  }

  scroll();
}

export function validateUserSubscription(
  admin,
  hasPaymentEnabled,
  registerDate
) {
  // options: USER_TRIAL_ENDED || USER_TRIAL_PERIOD || USER_ALLOWED
  const TOTAL_TRIAL_DAYS = 7;

  if (!admin) return 'USER_ALLOWED';
  if (hasPaymentEnabled) return 'USER_ALLOWED';

  const daysSinceRegister = differenceInDays(
    new Date(),
    new Date(registerDate)
  );

  if (daysSinceRegister <= TOTAL_TRIAL_DAYS) return 'USER_TRIAL_PERIOD';

  return 'USER_TRIAL_ENDED';
}
