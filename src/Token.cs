namespace AspnetCoreFull
{
  public class TokenIdentity
  {
    public string Token { get; set; }
    public DateTime TokenExp { get; set; }
    public DateTime RefreshTokenExp { get; set; }
    public string RefreshToken { get; set; }

  }
}
