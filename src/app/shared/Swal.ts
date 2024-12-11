import Swal, { SweetAlertOptions } from 'sweetalert2';

export const DialogSwal = () => {
  const Alert = (config: SweetAlertOptions) => {
    Swal.fire(config);
  };

  const Notify = () => {
    return Swal;
  };

  const Confirm = (config: SweetAlertOptions) => {
    const swalButtons = Swal.mixin({
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton:
          'py-2 px-4 m-2 rounded-md bg-green-500 text-white hover:bg-green-600',
        cancelButton:
          'py-2 px-4 rounded-md bg-red-500 text-white hover:bg-red-600',
      },
      buttonsStyling: false,
    });

    return swalButtons.fire(config);
  };
  return { Alert, Confirm, Notify };
};

export const ToastSwal = () => {
  const ToastError = (config: SweetAlertOptions) => {
    const Toast = Swal.mixin({
      toast: true,
      ...config,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      background: 'rgba(254, 202, 202,.8)',
      padding: '10px',
    });
  };

  const ToastSuccess = (config: SweetAlertOptions) => {
    const Toast = Swal.mixin({
      ...config,
      toast: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      background: 'rgba(167, 243, 208,.8)',
      padding: '5px',
    });
  };

  const ToastWarning = (config: SweetAlertOptions) => {
    const Toast = Swal.mixin({
      ...config,
      toast: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      background: 'rgba(1253, 230, 138,.8)',
      padding: '5px',
    });
  };

  const ToastInfo = (config: SweetAlertOptions) => {
    const Toast = Swal.mixin({
      ...config,
      toast: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      background: 'rgba(191, 219, 254,.8)',
      padding: '5px',
    });
  };

  const ToastQuestion = (config: SweetAlertOptions) => {
    const Toast = Swal.mixin({
      ...config,
      toast: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      background: 'rgba(229, 231, 235,.8)',
      padding: '5px',
    });
  };

  return { ToastError, ToastSuccess, ToastWarning, ToastInfo, ToastQuestion };
};
