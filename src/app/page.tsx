import CertificateVerificationForm from '@/components/ui/CertificateVerification'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Certificate Verification</h1>
      <CertificateVerificationForm />
    </div>
  )
}

