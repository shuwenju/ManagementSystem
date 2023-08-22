using Management.Service.Models;
using MimeKit;
using MailKit.Net.Smtp;
using System.Net.Mail;
using MimeKit.Text;

namespace Management.Service.Services
{
	public class EmailService : IEmailService
	{
		private readonly EmailConfiguration _emailConfig;
		public EmailService(EmailConfiguration emailConfig) => _emailConfig = emailConfig;

		public void SendEmail(Message message)
		{
			var emailMessage = CreateEmailMessage(message, TextFormat.Text);
			Send(emailMessage);
		}

        public void SendHtmlEmail(Message message)
        {
            var emailMessage = CreateEmailMessage(message, TextFormat.Html);
            Send(emailMessage);
        }

        private MimeMessage CreateEmailMessage(Message message, TextFormat format)
		{
			var emailMessage = new MimeMessage();
			emailMessage.From.Add(new MailboxAddress("RAM Inventory Management", _emailConfig.From));
			emailMessage.To.AddRange(message.To);
			emailMessage.Subject = message.Subject;
			emailMessage.Body = new TextPart(format) { Text = message.Content };
			return emailMessage;
		}

		private void Send(MimeMessage mailMessage)
		{
			using var client = new MailKit.Net.Smtp.SmtpClient();
			try
			{
				client.Connect(_emailConfig.SmtpServer, _emailConfig.Port, true);
				client.AuthenticationMechanisms.Remove("XOAUTH2"); 

				client.Authenticate(_emailConfig.Username, _emailConfig.Password);

				client.Send(mailMessage);
			}
			catch
			{
				throw;
			}
			finally
			{
				client.Disconnect(true);
				client.Dispose();
			}
		}

	}
}
