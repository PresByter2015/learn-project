let doAjaxUpload = blob => {
  let xhrObject = new XMLHttpRequest ();
  let postUrl = SyApp.util.api (
    '/file/upload/?suffix=.' +
      blob.type.replace ('image/', '') +
      '&simple_name=1'
  );
  xhrObject.open ('POST', postUrl);
  xhrObject.timeout = 60000;
  xhrObject.ontimeout = function () {
    SyApp.ui.toast ('上传图片等待超时，请重试');
  };

  xhrObject.onreadystatechange = function () {
    let isJson = false, data;
    try {
      data = JSON.parse (xhrObject.responseText);
      isJson = true;
    } catch (e) {
      data = xhrObject.responseText;
    }

    if (xhrObject.readyState === 4) {
      if (xhrObject.status !== 200) {
        SyApp.ui.toast (xhrObject.statusText);
      } else {
        // 上传成功，获取图片地址
        console.log (data.id);
      }
    }
  };

  xhrObject.send (blob);
};
let dataURItoBlob = dataURI => {
  let byteString = '';
  if (dataURI.split (',')[0].indexOf ('base64') >= 0)
    byteString = atob (dataURI.split (',')[1]);
  else byteString = unescape (dataURI.split (',')[1]);
  let mimeString = dataURI.split (',')[0].split (':')[1].split (';')[0];
  let ia = new Uint8Array (byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt (i);
  }
  return new Blob ([ia], {type: mimeString});
};
let canvasBase64 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAfCAYAAAAfrhY5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzJCNkJCMjhEOThEMTFFNUIxRjU5MUNEQTYwMkFGQzIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzJCNkJCMjlEOThEMTFFNUIxRjU5MUNEQTYwMkFGQzIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3MkI2QkIyNkQ5OEQxMUU1QjFGNTkxQ0RBNjAyQUZDMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3MkI2QkIyN0Q5OEQxMUU1QjFGNTkxQ0RBNjAyQUZDMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuZ6HjkAAARJSURBVHjapFdLTJNBEJ6/7QWQ4sUHFK+iJiZG8SAoDz2qiPFxwJuxBcTEizEhHDz6SEw8SBRfFyPxgfEBRwVB8RFBTYg8TESTgoJehJZ6oFhn/u60u/vvX0vc5Gt399+d2Z2dnfnWSiQSkGVZg9iN2IpYh1iGKEDMIH4iRhDPEZ2I0awkkvIMsBC1iNeJxZXXYp6VSb6VYeerEVcQldSYmvoOY2OjMDj4FiYnJyASmYVoNAp5eXng9/shEFgFGzeWQknJGigsLGIZvYh6xJhJgZvyA4gbiCXfvk1Cb28PdHU91CwmBFjpNtd37doDlZXboagoQM0o4jDiXjbKg4jLCM/Lly+gre0izM/HbcGyAq7LffKifD4f1Nc3QXn5Nmr+QTQgrmZSvh9xG+Ht7n4C169fhuR3y7hD3Xd4nFw/cqQRqqt30JAFRB3irkk5nfEAIr+n5ylcu3bJodhtx/IRmBYXDB6FqqrtVI0gShGfZOU0vIecq7//ObS2XhBdkNqJJSSy8PXrN6SEDw19yOgDVG9qOs5HQE5YTd2svBbxgJyrufkEnvF8ahdiemoxrODWrY5Uu65un7ZY5yLIB06fPs9OuBfx0CPmn7SX1NutKKZ/FpL8T0hnqrhOaqz+iefH43FbvqzPIyLXFrrHXV2PXK6TJRZjGQOC3C0vWJfV2fnIjhekj/R6RMi0A4huNnmX6q7S0j9+HFIU8PhkFIMUWN7o6AgPr/GIWG1HLp6gerYF/wr/8nc3K/GY9+8HuKvcI5IETEyElR2ZBMsOJO9Y9Qv5hjiPIRwOc3UdKV9uX0CM1epk9Rxl8/MOVXPrC7akI0g6K7UjkRkettyHP36qxWJzht2m7zeb03QE7tHPkvqSH2KxGH/0085nqZabm6sJSxiPQXdE0zGpplbH5eTkcDVCyn9QLT+/QPN2y5gw9PL16xejUja1voGCgqVcnSblw1QrLl5ldC79qsh3386XmNO5T/cT0wYo74syTMr7qbZp02ZZrWJiZxpNwPj4ZxgeHoK5uahxnHzn5bmSnn5yuMeIs8RAZE92C5P8vb39ZsqsekRLty2HRUiPKI89guy9WbmyEBlIbQYHU83e3t6BuA8tLacgWw66c+ceID1YXpFeTixn6KeiosrOPur9NgUQ5wKd91y9/16vF6lVNQ85x4mFCmWUvkCgGEKhJoWdmDxeN7Mbu5FLQ8MxIPmkR+hzMJlBIo1pJmMOJP9agF4PhRqRyexgMlnKbFbncAfpOGUOZ04e7vxNHx8MKhzuEOJOVuyVKFVbWyssLMQzmt7EYH0+r23qsrLs2auDt9MDoa/vmYO36zkgzVyJt9fYvF2c8aJ4u+wDtNIKfrEQEXj3bgBfLGGYmfmFSeI35oQcfLEstSMkBRC6x+I6sXOF3F4s2b7V3izyrUbj9/7PW830Sq0RzGctYgXlI8HFp8Ur9YWImFm9Uv8KMABal/0EJeLUOwAAAABJRU5ErkJggg==';
let blob = dataURItoBlob (canvasBase64);
doAjaxUpload (blob);
