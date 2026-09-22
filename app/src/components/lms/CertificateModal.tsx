import React, { useRef, useState, useEffect } from 'react';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';
import { Button } from '../ui/button';
import type { CertificateData } from '../../types/lms';
import { Award, Download, CheckCircle2, X, Sun, Moon } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';

interface CertificateModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly certificate: CertificateData;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  certificate,
}) => {
  const printRef = useRef<HTMLDivElement>(null);
  
  // Default to global theme via checking the html class (fallback to light)
  const [certTheme, setCertTheme] = useState<'light' | 'dark'>('light');
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const isGlobalDark = document.documentElement.classList.contains('dark');
      setCertTheme(isGlobalDark ? 'dark' : 'light');
    }
  }, [isOpen]);

  const handleDownloadPDF = async () => {
    if (!printRef.current) return;
    try {
      setIsDownloading(true);
      
      // Wait for any UI transitions to settle
      await new Promise(resolve => setTimeout(resolve, 150));

      const imgData = await toPng(printRef.current, {
        pixelRatio: 2, // High resolution
        backgroundColor: certTheme === 'dark' ? '#141414' : '#f5f5f5',
        style: {
          // html-to-image uses SVG foreignObject, which needs exact pixel dimensions for @container to work correctly inside it. 
          // We can force the dimensions if needed, but it should inherit naturally.
        }
      });

      
      // jsPDF landscape A4
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${certificate.recipientName.replace(/\s+/g, '_')}_Certificate.pdf`);
    } catch (error) {
      console.error('Failed to generate PDF', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[1000px] sm:max-w-[1000px] w-[95vw] rounded-none border border-border bg-card p-0 shadow-2xl overflow-hidden sm:max-h-[95vh] flex flex-col">
        <DialogHeader className="border-b border-border bg-muted/40 p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <DialogTitle className="text-lg sm:text-xl font-semibold text-foreground flex items-center gap-2">
              <Award className="size-5 text-primary" />
              Verified Certificate of Competency
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground mt-1">
              EduPlus Skills Ecosystem // Official Milestone Verification
            </DialogDescription>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCertTheme(t => t === 'light' ? 'dark' : 'light')}
              className="h-9 size-9 p-0 rounded-none border-border"
              title="Toggle Certificate Theme"
            >
              {certTheme === 'light' ? <Moon className="size-4" /> : <Sun className="size-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="h-9 gap-1.5 rounded-none border-border"
            >
              {isDownloading ? <Spinner size="sm" /> : <Download className="size-4" />}
              {isDownloading ? 'Generating...' : 'Download PDF'}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-9 size-9 p-0 rounded-none text-muted-foreground hover:text-foreground"
              aria-label="Close dialog"
            >
              <X className="size-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* ── Certificate Body (Nordic Lagom Straight Lines) ── */}
        <div className="overflow-y-auto p-4 sm:p-8 bg-muted/20 flex items-center justify-center w-full min-h-0">
          {/* Certificate Container with aspect-ratio and @container for fluid typography */}
          <div ref={printRef} className={`w-full max-w-[1200px] @container/cert ${certTheme}`}>
            <div
              className="w-full bg-background border border-border relative flex flex-col items-center justify-between text-center select-none shadow-sm aspect-[1.414/1] p-[4cqw]"
              style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
            >
              {/* Straight-line double ornamental border */}
              <div className="absolute inset-[1.5cqw] border border-primary/30 pointer-events-none" />
              <div className="absolute inset-[2cqw] border border-border/80 pointer-events-none" />

              {/* Header Mark */}
              <div className="flex items-center justify-center gap-[1cqw] mt-[2cqw]">
                <span className="font-semibold tracking-[0.25em] text-primary uppercase text-[1.2cqw]">
                  EDU+ SKILLS ECOSYSTEM
                </span>
                <span className="text-muted-foreground/40 text-[1.2cqw]">//</span>
                <span className="tracking-widest text-muted-foreground text-[1cqw]">ACCREDITED</span>
              </div>

              {/* Body */}
              <div className="flex flex-col items-center flex-grow justify-center w-full px-[5cqw]">
                <p className="uppercase tracking-[0.25em] text-muted-foreground text-[1.2cqw] mb-[1.5cqw]">
                  Certificate of Curriculum Mastery
                </p>

                <h2 className="font-heading font-medium text-foreground tracking-tight mb-[2cqw] text-[4.5cqw] leading-none">
                  {certificate.recipientName || 'Verified EduPlus Learner'}
                </h2>

                <p className="text-muted-foreground max-w-[70%] text-[1.2cqw] leading-relaxed mb-[3cqw]">
                  has successfully fulfilled the rigorous academic and practical requirements of the official EduPlus Skills curriculum track:
                </p>

                <div className="border border-primary/40 bg-primary/5 px-[4cqw] py-[1.5cqw] w-full max-w-[80%]">
                  <div className="font-mono text-primary uppercase tracking-widest text-[1cqw] mb-[0.5cqw]">
                    {certificate.trackCode}
                  </div>
                  <div className="font-heading font-medium text-foreground text-[2.5cqw] leading-tight">
                    {certificate.trackTitle}
                  </div>
                </div>
              </div>

              {/* Footer Grid */}
              <div className="grid grid-cols-2 gap-[4cqw] w-full max-w-[85%] pt-[2cqw] border-t border-border/80 text-left mb-[2cqw]">
                <div>
                  <p className="uppercase tracking-[0.15em] text-muted-foreground text-[0.8cqw] mb-[0.5cqw]">
                    Verified By Council Lead
                  </p>
                  <p className="font-medium text-foreground uppercase tracking-wide text-[1.2cqw]">
                    {certificate.verifiedAdvisor}
                  </p>
                  <p className="text-muted-foreground text-[1cqw] mt-[0.2cqw]">
                    {certificate.verifiedAdvisorTitle}
                  </p>
                </div>
                <div className="text-right">
                  <p className="uppercase tracking-[0.15em] text-muted-foreground text-[0.8cqw] mb-[0.5cqw]">
                    Issued Date & Security ID
                  </p>
                  <p className="font-mono text-foreground uppercase text-[1.2cqw]">
                    {certificate.completionDate}
                  </p>
                  <p className="font-mono text-muted-foreground text-[1cqw] mt-[0.2cqw]">
                    ID: {certificate.certificateId}
                  </p>
                </div>
              </div>

              {/* Verification Badge */}
              <div className="absolute bottom-[0cqw] translate-y-1/2 flex items-center justify-center gap-[0.5cqw] text-[#22C55E] font-mono tracking-widest bg-background px-[2cqw] py-[0.5cqw] border border-[#22C55E]/20">
                <CheckCircle2 className="w-[1.2cqw] h-[1.2cqw]" />
                <span className="text-[0.9cqw]">AUTHENTICATED RECORD // EDUPLUS SKILLS COUNCIL</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
