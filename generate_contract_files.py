import os
import shutil
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement
from docx.oxml.ns import qn

from reportlab.lib.pagesizes import letter
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    HRFlowable,
    KeepTogether,
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

CONTRACT_MD_PATH = r"d:\Umair\Antigravity\globaledge-consultancy\LEGAL_STUDENT_CONTRACT.md"
DOCX_OUT_PATH = r"d:\Umair\Antigravity\globaledge-consultancy\LEGAL_STUDENT_CONTRACT.docx"
PDF_OUT_PATH = r"d:\Umair\Antigravity\globaledge-consultancy\LEGAL_STUDENT_CONTRACT.pdf"
PUBLIC_DOCX = r"d:\Umair\Antigravity\globaledge-consultancy\frontend\public\LEGAL_STUDENT_CONTRACT.docx"
PUBLIC_PDF = r"d:\Umair\Antigravity\globaledge-consultancy\frontend\public\LEGAL_STUDENT_CONTRACT.pdf"
BRAIN_DOCX = r"C:\Users\Administrator\.gemini\antigravity\brain\6fdcc67c-d63d-4a0a-9bd4-1e784da861d7\LEGAL_STUDENT_CONTRACT.docx"
BRAIN_PDF = r"C:\Users\Administrator\.gemini\antigravity\brain\6fdcc67c-d63d-4a0a-9bd4-1e784da861d7\LEGAL_STUDENT_CONTRACT.pdf"

# 1. CREATE WORD DOCX
def create_docx():
    doc = Document()

    # Page Margins
    for section in doc.sections:
        section.top_margin = Inches(0.8)
        section.bottom_margin = Inches(0.8)
        section.left_margin = Inches(0.8)
        section.right_margin = Inches(0.8)

    # Styles
    title = doc.add_heading(level=0)
    title_run = title.add_run("STUDENT CONSULTANCY & EDUCATIONAL ADVISORY SERVICES AGREEMENT")
    title_run.font.name = "Arial"
    title_run.font.size = Pt(16)
    title_run.font.bold = True
    title_run.font.color.rgb = RGBColor(30, 58, 95) # #1e3a5f
    title.alignment = WD_ALIGN_PARAGRAPH.CENTER

    sub = doc.add_paragraph()
    sub_run = sub.add_run("GLOBALEDGE CONSULTANCY / HUZ GLOBAL SOLUTIONS (PVT.) LTD.\nForm of Professional Educational Services Contract (Islamic Republic of Pakistan)")
    sub_run.font.name = "Arial"
    sub_run.font.size = Pt(10)
    sub_run.font.italic = True
    sub_run.font.color.rgb = RGBColor(100, 100, 100)
    sub.alignment = WD_ALIGN_PARAGRAPH.CENTER

    doc.add_paragraph().paragraph_format.space_after = Pt(10)

    with open(CONTRACT_MD_PATH, "r", encoding="utf-8") as f:
        lines = f.readlines()

    in_table = False
    table_rows = []

    for line in lines:
        stripped = line.strip()

        if stripped.startswith("# STUDENT CONSULTANCY"):
            continue

        if stripped.startswith("|"):
            in_table = True
            if not stripped.startswith("|---"):
                cols = [c.strip() for c in stripped.split("|")[1:-1]]
                table_rows.append(cols)
            continue
        else:
            if in_table:
                # Flush table to document
                if table_rows:
                    table = doc.add_table(rows=len(table_rows), cols=len(table_rows[0]))
                    table.alignment = WD_TABLE_ALIGNMENT.CENTER
                    table.style = 'Table Grid'
                    for r_idx, row in enumerate(table_rows):
                        for c_idx, cell in enumerate(row):
                            c = table.cell(r_idx, c_idx)
                            # Clean markdown bold/break tags
                            clean_text = cell.replace("**", "").replace("<br>", "\n").replace("•", "• ")
                            c.text = clean_text
                            if r_idx == 0:
                                for p in c.paragraphs:
                                    for run in p.runs:
                                        run.font.bold = True
                                        run.font.color.rgb = RGBColor(30, 58, 95)
                    doc.add_paragraph().paragraph_format.space_after = Pt(6)
                in_table = False
                table_rows = []

        if not stripped:
            continue

        if stripped.startswith("### "):
            h = doc.add_heading(level=2)
            hrun = h.add_run(stripped.replace("### ", ""))
            hrun.font.name = "Arial"
            hrun.font.size = Pt(12)
            hrun.font.bold = True
            hrun.font.color.rgb = RGBColor(30, 58, 95)
            h.paragraph_format.space_before = Pt(12)
            h.paragraph_format.space_after = Pt(4)
        elif stripped.startswith("#### "):
            h = doc.add_heading(level=3)
            hrun = h.add_run(stripped.replace("#### ", ""))
            hrun.font.name = "Arial"
            hrun.font.size = Pt(11)
            hrun.font.bold = True
            hrun.font.color.rgb = RGBColor(180, 120, 20)
            h.paragraph_format.space_before = Pt(8)
            h.paragraph_format.space_after = Pt(2)
        elif stripped.startswith("> "):
            p = doc.add_paragraph()
            p.paragraph_format.left_indent = Inches(0.4)
            p.paragraph_format.right_indent = Inches(0.4)
            run = p.add_run(stripped.replace("> ", "").replace('"', ''))
            run.font.name = "Arial"
            run.font.size = Pt(9.5)
            run.font.italic = True
        elif stripped == "---":
            p = doc.add_paragraph()
            p.paragraph_format.space_after = Pt(6)
        else:
            p = doc.add_paragraph()
            p.paragraph_format.space_after = Pt(4)
            # Simple bold handler
            parts = stripped.split("**")
            is_bold = False
            for part in parts:
                if part:
                    run = p.add_run(part)
                    run.font.name = "Arial"
                    run.font.size = Pt(10)
                    if is_bold:
                        run.font.bold = True
                is_bold = not is_bold

    doc.save(DOCX_OUT_PATH)
    print("DOCX successfully generated:", DOCX_OUT_PATH)

# 2. CREATE PDF WITH REPORTLAB
def create_pdf():
    pdf = SimpleDocTemplate(
        PDF_OUT_PATH,
        pagesize=letter,
        rightMargin=45,
        leftMargin=45,
        topMargin=45,
        bottomMargin=45,
    )

    styles = getSampleStyleSheet()
    
    primary_color = colors.HexColor("#1e3a5f")
    gold_color = colors.HexColor("#d4891a")
    text_color = colors.HexColor("#222222")

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=15,
        leading=18,
        textColor=primary_color,
        alignment=1, # Center
        spaceAfter=4,
    )

    sub_style = ParagraphStyle(
        'DocSub',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=9,
        leading=12,
        textColor=colors.gray,
        alignment=1,
        spaceAfter=15,
    )

    h2_style = ParagraphStyle(
        'Heading2Custom',
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=primary_color,
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True,
    )

    body_style = ParagraphStyle(
        'BodyCustom',
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=text_color,
        spaceAfter=4,
    )

    quote_style = ParagraphStyle(
        'QuoteCustom',
        fontName='Helvetica-Oblique',
        fontSize=8.5,
        leading=11.5,
        textColor=colors.HexColor("#2c3e50"),
        leftIndent=20,
        rightIndent=20,
        spaceBefore=5,
        spaceAfter=5,
    )

    table_cell_style = ParagraphStyle(
        'TableCell',
        fontName='Helvetica',
        fontSize=7.5,
        leading=9.5,
        textColor=text_color,
    )

    table_header_style = ParagraphStyle(
        'TableHeader',
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10,
        textColor=colors.white,
    )

    story = []

    story.append(Paragraph("STUDENT CONSULTANCY & EDUCATIONAL ADVISORY SERVICES AGREEMENT", title_style))
    story.append(Paragraph("GLOBALEDGE CONSULTANCY / HUZ GLOBAL SOLUTIONS (PVT.) LTD. &bull; ISLAMIC REPUBLIC OF PAKISTAN", sub_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=primary_color, spaceAfter=10))

    with open(CONTRACT_MD_PATH, "r", encoding="utf-8") as f:
        lines = f.readlines()

    in_table = False
    table_rows = []

    for line in lines:
        stripped = line.strip()
        if stripped.startswith("# STUDENT CONSULTANCY"):
            continue

        if stripped.startswith("|"):
            in_table = True
            if not stripped.startswith("|---"):
                cols = [c.strip() for c in stripped.split("|")[1:-1]]
                table_rows.append(cols)
            continue
        else:
            if in_table:
                if table_rows:
                    t_data = []
                    for r_idx, row in enumerate(table_rows):
                        r_data = []
                        for c in row:
                            formatted = c.replace("<br>", "<br/>").replace("•", "&bull; ")
                            st = table_header_style if r_idx == 0 else table_cell_style
                            r_data.append(Paragraph(formatted, st))
                        t_data.append(r_data)
                    
                    col_widths = [75, 230, 95, 65]
                    t = Table(t_data, colWidths=col_widths)
                    t.setStyle(TableStyle([
                        ('BACKGROUND', (0, 0), (-1, 0), primary_color),
                        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
                        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
                        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#dddddd")),
                        ('TOPPADDING', (0, 0), (-1, -1), 4),
                        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
                        ('LEFTPADDING', (0, 0), (-1, -1), 5),
                        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
                    ]))
                    story.append(Spacer(1, 4))
                    story.append(t)
                    story.append(Spacer(1, 8))
                in_table = False
                table_rows = []

        if not stripped:
            continue

        if stripped.startswith("### "):
            text = stripped.replace("### ", "")
            story.append(Paragraph(text, h2_style))
        elif stripped.startswith("> "):
            text = stripped.replace("> ", "").replace('"', '')
            story.append(Paragraph(f"<i>&ldquo;{text}&rdquo;</i>", quote_style))
        elif stripped == "---":
            story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#e0e0e0"), spaceAfter=6, spaceBefore=4))
        else:
            # Format markdown bold for reportlab
            formatted = stripped
            # Replace **bold** with <b>bold</b>
            parts = formatted.split("**")
            rebuilt = ""
            is_b = False
            for p in parts:
                if is_b:
                    rebuilt += f"<b>{p}</b>"
                else:
                    rebuilt += p
                is_b = not is_b
            rebuilt = rebuilt.replace("&", "&amp;").replace("<br />", "<br/>").replace("<br>", "<br/>")
            rebuilt = rebuilt.replace("<b>&amp;</b>", "<b>&</b>")
            story.append(Paragraph(rebuilt, body_style))

    pdf.build(story)
    print("PDF successfully generated:", PDF_OUT_PATH)

if __name__ == "__main__":
    create_docx()
    create_pdf()

    # Copy files to public and brain artifact
    for src, dst in [(DOCX_OUT_PATH, PUBLIC_DOCX), (PDF_OUT_PATH, PUBLIC_PDF),
                     (DOCX_OUT_PATH, BRAIN_DOCX), (PDF_OUT_PATH, BRAIN_PDF)]:
        shutil.copyfile(src, dst)
        print(f"Copied {src} -> {dst}")
