import React, { useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';
import { Button } from '../ui/button';
import type { CertificateData } from '../../types/lms';
import { Award, Download, CheckCircle2, X } from 'lucide-react';

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

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl rounded-none border border-border bg-card p-0 shadow-2xl overflow-hidden sm:max-h-[90vh] flex flex-col">
        <DialogHeader className="border-b border-border bg-muted/40 p-4 flex flex-row items-center justify-between">
          <div>
            <DialogTitle className="text-base font-semibold text-foreground flex items-center gap-2">
              <Award className="size-4 text-primary" />
              Verified Certificate of Competency
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground mt-0.5">
              EduPlus Skills Ecosystem // Official Milestone Verification
            </DialogDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="h-8 gap-1.5 rounded-none border-border text-xs"
            >
              <Download className="size-3.5" />
              Print / Save PDF
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 size-8 p-0 rounded-none text-muted-foreground hover:text-foreground"
              aria-label="Close dialog"
            >
              <X className="size-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* ── Printable Certificate Body (Nordic Lagom Straight Lines) ── */}
        <div
          ref={printRef}
          className="p-8 sm:p-12 bg-background border border-border m-4 sm:m-6 relative flex flex-col items-center text-center select-none print:m-0 print:border-none"
        >
          {/* Straight-line double ornamental border */}
          <div className="absolute inset-2 border border-primary/30 pointer-events-none" />
          <div className="absolute inset-3 border border-border/80 pointer-events-none" />

          {/* Header Mark */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-semibold tracking-widest text-primary uppercase">
              EDU+ SKILLS ECOSYSTEM
            </span>
            <span className="text-xs text-muted-foreground">// ACCREDITED</span>
          </div>

          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
            Certificate of Curriculum Mastery
          </p>

          <h2 className="text-2xl sm:text-3xl font-heading font-medium text-foreground tracking-tight mb-2">
            {certificate.recipientName || 'Verified EduPlus Learner'}
          </h2>

          <p className="text-xs text-muted-foreground max-w-md mb-6 leading-relaxed">
            has successfully fulfilled the rigorous academic and practical requirements of the official EduPlus Skills curriculum track:
          </p>

          <div className="border border-primary/40 bg-primary/5 px-6 py-3 mb-6 max-w-lg w-full">
            <div className="text-xs font-mono text-primary mb-1 uppercase tracking-wider">
              {certificate.trackCode}
            </div>
            <div className="text-lg sm:text-xl font-heading font-medium text-foreground">
              {certificate.trackTitle}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 w-full max-w-md pt-4 border-t border-border/80 text-left">
            <div>
              <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground mb-1">
                Verified By Council Lead
              </p>
              <p className="text-xs font-medium text-foreground">
                {certificate.verifiedAdvisor}
              </p>
              <p className="text-[0.65rem] text-muted-foreground leading-tight">
                {certificate.verifiedAdvisorTitle}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground mb-1">
                Issued Date & Security ID
              </p>
              <p className="text-xs font-mono text-foreground">
                {certificate.completionDate}
              </p>
              <p className="text-[0.65rem] font-mono text-muted-foreground">
                ID: {certificate.certificateId}
              </p>
            </div>
          </div>

          {/* Verification Badge */}
          <div className="mt-8 flex items-center gap-1.5 text-xs text-emerald-500 font-mono">
            <CheckCircle2 className="size-3.5" />
            <span>AUTHENTICATED RECORD // EDUPLUS SKILLS COUNCIL</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
