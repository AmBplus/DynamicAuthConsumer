using AspnetCoreStarter.CustomMiddlewares;

var builder = WebApplication.CreateBuilder(args);
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
  options.AddPolicy(name: MyAllowSpecificOrigins,
  builder =>
  {
    builder.AllowAnyOrigin();
    builder.AllowAnyHeader();
    builder.AllowAnyMethod();

  });

});
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

// Add services to the container.
builder.Services.AddRazorPages();
// Configure()-> using Microsoft.Extensions.DependencyInjection;
builder.Services.Configure<Infrastructure.Settings.ApplicationSettings>
  (builder.Configuration.GetSection(key: Infrastructure.Settings.ApplicationSettings.KeyName))
  // AddSingleton()-> using Microsoft.Extensions.DependencyInjection;
  .AddSingleton
  (implementationFactory: serviceType =>
  {
    var result =
      // GetRequiredService()-> using Microsoft.Extensions.DependencyInjection;
      serviceType.GetRequiredService
      <Microsoft.Extensions.Options.IOptions
      <Infrastructure.Settings.ApplicationSettings>>().Value;

    return result;
  });
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
  app.UseExceptionHandler("/Error");
  // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
  app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.UseCors(MyAllowSpecificOrigins);
app.UseAuthorization();

app.MapRazorPages();
//app.UseSetDomainMiddleware("https://localhost:5001");
app.Run();
