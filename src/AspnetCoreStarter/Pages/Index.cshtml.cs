using Bootstrap5ToastExample.Classes;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace AspnetCoreStarter.Pages
{
  public class IndexModel : BasePageModel
  {
    [BindProperty]
    public List<ToastContainer> Containers { get; set; }

    [BindProperty]
    public string TopToast { get; set; }
    [BindProperty]
    public string BottomToast { get; set; }
    [BindProperty]
    public string ToastMessage { get; set; }
    public void OnGet() {
      TopToast = "Enter something for top toast";
      BottomToast = "Enter something for bottom toast";

      ToastMessage = "Simple notification";
      AddToastError("خطایی رخ داده لطفا بررسی کنید");
      AddPageError("خطایی جالب رخ داده....");
      AddAlertSuccess("عملیات درج پیغام با موفقیت انجام شد");
      AddAlertWarning("شاید عملیات درج پیغام با موفقیت انجام شد");
      AddAlertError("عملیات درج پیغام با موفقیت انجام نشد");
    }
  }
}
